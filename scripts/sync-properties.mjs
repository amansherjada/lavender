#!/usr/bin/env node
// Runs on a schedule via .github/workflows/sync-properties.yml (GitHub-hosted
// runner, NOT Cloudflare's network -- Property Finder's CDN blocks requests
// originating from Cloudflare Workers, confirmed via repeated direct testing).
//
// Fetches live Property Finder listings, drops any without an advertising
// permit number attached (the compliance gate agreed with the client -- a
// listing with no permit must never be published), normalizes the rest to
// match the site's PropertyListing shape, and writes the result straight
// into the site's Cloudflare KV namespace via the REST API.
//
// Keep the mapping logic here in sync with lib/properties.ts's
// PropertyListing interface if that ever changes.

const PF_BASE_URL = "https://atlas.propertyfinder.com";
const CF_ACCOUNT_ID = "35e3b00278412afdf81a7264abb6e56e";
const CF_KV_NAMESPACE_ID = "6566b4ee51fe49539d38f5d769249a76";
const KV_PROPERTIES_KEY = "properties:all";

const {
  PROPERTYFINDER_API_KEY,
  PROPERTYFINDER_API_SECRET,
  CF_API_TOKEN,
} = process.env;

if (!PROPERTYFINDER_API_KEY || !PROPERTYFINDER_API_SECRET || !CF_API_TOKEN) {
  console.error(
    "Missing required env vars: PROPERTYFINDER_API_KEY, PROPERTYFINDER_API_SECRET, CF_API_TOKEN"
  );
  process.exit(1);
}

const KNOWN_COMMUNITIES = [
  { match: /saadiyat/i, name: "Saadiyat Island" },
  { match: /yas island|yas\b/i, name: "Yas Island" },
  { match: /al reef/i, name: "Al Reef" },
  { match: /al reem|reem island/i, name: "Al Reem Island" },
];

async function getAccessToken() {
  const res = await fetch(`${PF_BASE_URL}/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: PROPERTYFINDER_API_KEY.trim(),
      apiSecret: PROPERTYFINDER_API_SECRET.trim(),
    }),
  });
  if (!res.ok) {
    throw new Error(`Property Finder auth failed: ${res.status} ${await res.text()}`);
  }
  const body = await res.json();
  return body.accessToken;
}

async function fetchAllLiveListings(token) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `${PF_BASE_URL}/v1/listings?filter[state]=live&perPage=50&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      throw new Error(`Listings fetch failed: ${res.status} ${await res.text()}`);
    }
    const body = await res.json();
    all.push(...body.results);
    if (page >= body.pagination.totalPages) break;
    page += 1;
  }
  return all;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveLocation(description) {
  for (const { match, name } of KNOWN_COMMUNITIES) {
    if (match.test(description)) return `${name}, Abu Dhabi`;
  }
  return "Abu Dhabi";
}

function parseBeds(bedrooms) {
  if (!bedrooms || bedrooms === "none" || bedrooms === "studio") return 0;
  const n = parseInt(bedrooms, 10);
  return Number.isNaN(n) ? 0 : n;
}

function parseBaths(bathrooms) {
  if (!bathrooms || bathrooms === "none") return null;
  const n = parseInt(bathrooms, 10);
  return Number.isNaN(n) ? null : n;
}

function formatPrice(price) {
  const type = price?.type ?? "sale";
  const isSale = type === "sale";
  const amount = isSale
    ? price?.amounts?.sale
    : price?.amounts?.yearly ?? price?.amounts?.monthly ?? price?.amounts?.daily;

  // Yearly rent and sale prices are shown bare (the site's existing
  // convention); monthly/daily rent prices need a suffix or they read as
  // implausibly cheap next to yearly-quoted listings on the same page.
  const periodSuffix = !isSale && type === "monthly" ? "/month" : !isSale && type === "daily" ? "/day" : "";
  const display = amount
    ? `AED ${amount.toLocaleString("en-US")}${periodSuffix}`
    : "Price on Request";
  return {
    display,
    listingType: isSale ? "sale" : "rent",
    status: isSale ? "For Sale" : "For Rent",
  };
}

function hasValidPermit(listing) {
  return Boolean(listing.compliance?.listingAdvertisementNumber);
}

function mapListing(listing) {
  const title = listing.title?.en ?? "Untitled Listing";
  const description = listing.description?.en ?? "";
  const { display: price, listingType, status } = formatPrice(listing.price);
  const beds = parseBeds(listing.bedrooms);
  const type = listing.type
    ? listing.type.charAt(0).toUpperCase() + listing.type.slice(1)
    : "Property";
  const bedsLabel = listing.bedrooms === "studio" ? "Studio" : `${beds}-Bedroom`;

  const images = (listing.media?.images ?? [])
    .map((img) => img.original?.url)
    .filter(Boolean);

  return {
    id: listing.id,
    title,
    shortTitle: `${bedsLabel} ${type}`,
    location: resolveLocation(description),
    price,
    beds,
    baths: parseBaths(listing.bathrooms),
    size: listing.size ? `${listing.size.toLocaleString("en-US")} sq ft` : null,
    status,
    listingType,
    slug: `${slugify(title)}-${listing.id.slice(-6).toLowerCase()}`,
    description,
    image: images[0] ?? "/images/hero-bg.jpg",
    images,
    permitNumber: listing.compliance.listingAdvertisementNumber,
    permitIssuedAt: listing.compliance?.advertisementLicenseIssuanceDate ?? null,
    licenseNumber: listing.compliance?.issuingClientLicenseNumber ?? null,
  };
}

async function writeToKV(properties) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_KV_NAMESPACE_ID}/values/${encodeURIComponent(KV_PROPERTIES_KEY)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({ properties, syncedAt: new Date().toISOString() }),
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(`Cloudflare KV write failed: ${JSON.stringify(body.errors)}`);
  }
}

async function main() {
  console.log("Authenticating with Property Finder...");
  const token = await getAccessToken();

  console.log("Fetching live listings...");
  const raw = await fetchAllLiveListings(token);

  const withPermit = raw.filter(hasValidPermit);
  const excluded = raw.length - withPermit.length;
  const properties = withPermit.map(mapListing);

  console.log(`Fetched ${raw.length} live listings, ${excluded} excluded (no permit), publishing ${properties.length}`);

  await writeToKV(properties);
  console.log("Synced to Cloudflare KV successfully.");
}

main().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
