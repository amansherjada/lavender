export interface City {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
}

export const cities: City[] = [
  {
    slug: "saadiyat-island",
    title: "Saadiyat Island, Abu Dhabi",
    subtitle: "Abu Dhabi's Cultural and Residential Crown",
    description:
      "Saadiyat Island is one of Abu Dhabi's most prestigious addresses, home to world-class museums, pristine beaches, and luxury residential communities. Located just minutes from the city centre, it offers an unmatched combination of culture, nature, and premium living.",
    highlights: [
      "Home to the Louvre Abu Dhabi and upcoming Guggenheim",
      "Natural beach and mangrove ecosystems",
      "Premium villa and apartment communities",
      "Walking distance to cultural district",
      "Exclusive gated communities",
    ],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  },
  {
    slug: "yas-island",
    title: "Yas Island, Abu Dhabi",
    subtitle: "Where Entertainment Meets Luxury Living",
    description:
      "Yas Island is Abu Dhabi's premier entertainment and residential destination. Home to Formula 1's Yas Marina Circuit, Ferrari World, Yas Waterworld, and Yas Mall, the island offers a vibrant lifestyle with world-class amenities right at your doorstep.",
    highlights: [
      "Ferrari World and Yas Waterworld theme parks",
      "Yas Marina Circuit — Formula 1 venue",
      "Yas Mall — 400+ retail outlets",
      "Waterfront living with marina access",
      "Close to Abu Dhabi Airport",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
  },
  {
    slug: "al-reef",
    title: "Al Reef, Abu Dhabi",
    subtitle: "Affordable Luxury in a Gated Community",
    description:
      "Al Reef is one of Abu Dhabi's most popular residential communities, offering a mix of villas and apartments in a well-planned, gated environment. Known for its family-friendly atmosphere, lush green spaces, and excellent community facilities.",
    highlights: [
      "Gated community with 24/7 security",
      "Mix of Contemporary and Arabic-style villas",
      "Community pools, parks, and retail",
      "Close to Abu Dhabi International Airport",
      "Affordable compared to central Abu Dhabi",
    ],
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
  },
  {
    slug: "al-reem-island",
    title: "Al Reem Island, Abu Dhabi",
    subtitle: "A Modern Urban Hub in the Heart of Abu Dhabi",
    description:
      "Al Reem Island is a rapidly developing mixed-use community just off the coast of Abu Dhabi. Known for its stunning marina and canal views, modern high-rise towers, and direct access to the city, it is one of the most sought-after addresses for professionals and families alike.",
    highlights: [
      "Direct access to Abu Dhabi city centre via bridges",
      "Marina and canal waterfront living",
      "Modern high-rise apartment towers",
      "Oasis Residence, Mangrove Place, Marina Heights",
      "Strong investment returns and rental demand",
    ],
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function cityNameToSlug(name: string): string | undefined {
  const map: Record<string, string> = {
    "Saadiyat Island": "saadiyat-island",
    "Yas Island": "yas-island",
    "Al Reef": "al-reef",
    "Al Reem Island": "al-reem-island",
  };
  return map[name];
}
