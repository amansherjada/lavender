// Server-only. Fetches live listings from the Property Finder Enterprise API,
// gates them by permit presence (a listing without an advertising permit
// number is never published to the site), and normalizes them into the
// site's PropertyListing shape.

import type { PropertyListing } from "./properties";

export const KV_PROPERTIES_KEY = "properties:all";

const BASE_URL = "https://atlas.propertyfinder.com";

// Only communities the site already has dedicated /city pages for are
// resolvable to a specific name. Anything else falls back to "Abu Dhabi"
// rather than guessing at a building/community name we can't verify.
const KNOWN_COMMUNITIES: { match: RegExp; name: string }[] = [
  { match: /saadiyat/i, name: "Saadiyat Island" },
  { match: /yas island|yas\b/i, name: "Yas Island" },
  { match: /al reef/i, name: "Al Reef" },
  { match: /al reem|reem island/i, name: "Al Reem Island" },
];

interface PFAuthResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

interface PFComplianceInfo {
  listingAdvertisementNumber?: string;
  issuingClientLicenseNumber?: string;
  advertisementLicenseIssuanceDate?: string;
  type?: string;
}

interface PFImage {
  original?: { url: string };
  watermarked?: { url: string };
}

interface PFListing {
  id: string;
  title?: { en?: string };
  description?: { en?: string };
  type?: string;
  category?: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: number;
  location?: { id: number };
  compliance?: PFComplianceInfo;
  media?: { images?: PFImage[] };
  price?: {
    type?: "sale" | "yearly" | "monthly" | "daily";
    amounts?: {
      sale?: number;
      yearly?: number;
      monthly?: number;
      daily?: number;
    };
  };
}

interface PFListingsResponse {
  pagination: { page: number; totalPages: number; total: number };
  results: PFListing[];
}

async function getAccessToken(apiKey: string, apiSecret: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/v1/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey, apiSecret }),
  });
  if (!res.ok) {
    throw new Error(`Property Finder auth failed: ${res.status} ${await res.text()}`);
  }
  const body = (await res.json()) as PFAuthResponse;
  return body.accessToken;
}

async function fetchAllLiveListings(token: string): Promise<PFListing[]> {
  const all: PFListing[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `${BASE_URL}/v1/listings?filter[state]=live&perPage=50&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      throw new Error(`Property Finder listings fetch failed: ${res.status} ${await res.text()}`);
    }
    const body = (await res.json()) as PFListingsResponse;
    all.push(...body.results);
    if (page >= body.pagination.totalPages) break;
    page += 1;
  }
  return all;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveLocation(description: string): string {
  for (const { match, name } of KNOWN_COMMUNITIES) {
    if (match.test(description)) return `${name}, Abu Dhabi`;
  }
  return "Abu Dhabi";
}

function parseBeds(bedrooms?: string): number {
  if (!bedrooms || bedrooms === "none" || bedrooms === "studio") return 0;
  const n = parseInt(bedrooms, 10);
  return Number.isNaN(n) ? 0 : n;
}

function parseBaths(bathrooms?: string): number | null {
  if (!bathrooms || bathrooms === "none") return null;
  const n = parseInt(bathrooms, 10);
  return Number.isNaN(n) ? null : n;
}

function formatPrice(price: PFListing["price"]): { display: string; listingType: "sale" | "rent"; status: "For Sale" | "For Rent" } {
  const type = price?.type ?? "sale";
  const isSale = type === "sale";
  const amount = isSale
    ? price?.amounts?.sale
    : price?.amounts?.yearly ?? price?.amounts?.monthly ?? price?.amounts?.daily;

  const display = amount ? `AED ${amount.toLocaleString("en-US")}` : "Price on Request";
  return {
    display,
    listingType: isSale ? "sale" : "rent",
    status: isSale ? "For Sale" : "For Rent",
  };
}

/**
 * A listing without an advertising permit number must never be published --
 * this is the compliance gate committed to on the client call.
 */
function hasValidPermit(listing: PFListing): boolean {
  return Boolean(listing.compliance?.listingAdvertisementNumber);
}

export interface SyncedPropertyListing extends PropertyListing {
  permitNumber: string;
  permitIssuedAt: string | null;
  licenseNumber: string | null;
  images: string[];
}

function mapListing(listing: PFListing): SyncedPropertyListing {
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
    .filter((url): url is string => Boolean(url));

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
    permitNumber: listing.compliance!.listingAdvertisementNumber!,
    permitIssuedAt: listing.compliance?.advertisementLicenseIssuanceDate ?? null,
    licenseNumber: listing.compliance?.issuingClientLicenseNumber ?? null,
  };
}

/**
 * Fetches, permit-gates, and normalizes all live Property Finder listings.
 * Listings without an advertising permit number are silently excluded.
 */
export async function fetchSyncedProperties(
  apiKey: string,
  apiSecret: string
): Promise<{ properties: SyncedPropertyListing[]; totalFetched: number; excludedNoPermit: number }> {
  const token = await getAccessToken(apiKey, apiSecret);
  const raw = await fetchAllLiveListings(token);
  const withPermit = raw.filter(hasValidPermit);
  const properties = withPermit.map(mapListing);
  return {
    properties,
    totalFetched: raw.length,
    excludedNoPermit: raw.length - withPermit.length,
  };
}
