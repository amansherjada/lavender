import { getCloudflareContext } from "@opennextjs/cloudflare";
import { KV_PROPERTIES_KEY } from "@/lib/propertyFinder";

export type ListingStatus = "sale" | "rent";

export interface PropertyListing {
  id: number | string;
  title: string;
  shortTitle?: string;
  location: string;
  price: string;
  beds: number;
  baths: number | null;
  size: string | null;
  status: "For Sale" | "For Rent";
  listingType: ListingStatus;
  slug: string;
  description: string;
  image: string;
  images?: string[];
  permitNumber?: string;
  permitIssuedAt?: string | null;
  licenseNumber?: string | null;
}

/**
 * All properties come live from Property Finder via the hourly sync job
 * (see app/api/cron/sync-properties and lib/propertyFinder.ts) -- there is
 * no hardcoded listing data. If the sync has never run yet, or KV is
 * temporarily unreachable, this returns an empty list rather than throwing,
 * so a page renders "no properties" instead of a hard error.
 */
export async function getAllProperties(): Promise<PropertyListing[]> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const raw = await env.LISTINGS_KV.get(KV_PROPERTIES_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as { properties: PropertyListing[] };
    return data.properties ?? [];
  } catch (error) {
    console.error("Failed to read synced properties from KV:", error);
    return [];
  }
}

export async function getPropertyBySlug(
  slug: string
): Promise<PropertyListing | undefined> {
  const all = await getAllProperties();
  return all.find((p) => p.slug === slug);
}

export async function getSaleProperties(): Promise<PropertyListing[]> {
  const all = await getAllProperties();
  return all.filter((p) => p.listingType === "sale");
}

export async function getRentProperties(): Promise<PropertyListing[]> {
  const all = await getAllProperties();
  return all.filter((p) => p.listingType === "rent");
}

const cityMatchers: Record<string, string[]> = {
  "saadiyat-island": ["saadiyat"],
  "yas-island": ["yas"],
  "al-reef": ["al reef", "reef"],
  "al-reem-island": ["al reem", "reem island"],
};

export async function getPropertiesByCity(
  citySlug: string
): Promise<PropertyListing[]> {
  const matchers = cityMatchers[citySlug];
  if (!matchers) return [];
  const all = await getAllProperties();
  return all.filter((p) => {
    const loc = p.location.toLowerCase();
    return matchers.some((m) => loc.includes(m));
  });
}

export async function getSimilarProperties(
  property: PropertyListing,
  limit = 3
): Promise<PropertyListing[]> {
  const all = await getAllProperties();
  const sameType = all.filter(
    (p) => p.listingType === property.listingType && p.id !== property.id
  );
  const sameLocation = sameType.filter((p) => {
    const loc = p.location.toLowerCase();
    const base = property.location.toLowerCase().split(",")[0]?.trim() ?? "";
    return base && loc.includes(base);
  });
  const pool = sameLocation.length >= limit ? sameLocation : sameType;
  return pool.slice(0, limit);
}

export interface PropertySearchFilters {
  type?: string;
  location?: string;
  beds?: string;
  budget?: string;
}

function bedsMatch(propertyBeds: number, filterBeds?: string): boolean {
  if (!filterBeds || filterBeds === "Any") return true;
  if (filterBeds === "Studio") return propertyBeds === 0;
  if (filterBeds === "5+") return propertyBeds >= 5;
  return propertyBeds === parseInt(filterBeds, 10);
}

function budgetMatch(price: string, filterBudget?: string): boolean {
  if (!filterBudget || filterBudget === "Any") return true;
  const numeric = parseInt(price.replace(/[^0-9]/g, ""), 10);
  if (!numeric) return true;
  switch (filterBudget) {
    case "Up to AED 1M":
      return numeric <= 1_000_000;
    case "AED 1M – 3M":
      return numeric > 1_000_000 && numeric <= 3_000_000;
    case "AED 3M – 5M":
      return numeric > 3_000_000 && numeric <= 5_000_000;
    case "AED 5M+":
      return numeric > 5_000_000;
    default:
      return true;
  }
}

export function filterProperties(
  list: PropertyListing[],
  filters: PropertySearchFilters
): PropertyListing[] {
  return list.filter((p) => {
    if (
      filters.type &&
      filters.type !== "Any" &&
      !p.title.toLowerCase().includes(filters.type.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.location &&
      filters.location !== "Any" &&
      !p.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (!bedsMatch(p.beds, filters.beds)) return false;
    if (!budgetMatch(p.price, filters.budget)) return false;
    return true;
  });
}
