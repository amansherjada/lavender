import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/properties";
import { cities } from "@/lib/cities";

const BASE_URL = "https://lavenderuae.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();
  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/about",
    "/contact",
    "/agents",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cityRoutes = cities.map((city) => ({
    url: `${BASE_URL}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const propertyRoutes = properties.map((property) => ({
    url: `${BASE_URL}/property/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...propertyRoutes];
}
