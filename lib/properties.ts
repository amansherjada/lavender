export type ListingStatus = "sale" | "rent";

export interface PropertyListing {
  id: number;
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
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80`;

export const properties: PropertyListing[] = [
  {
    id: 1,
    title: "3-Bedroom Apartment, Spacious Layout",
    shortTitle: "3-Bedroom Apartment",
    location: "Al Reem Island, Abu Dhabi",
    price: "AED 8,000,000",
    beds: 1,
    baths: 2,
    size: null,
    status: "For Sale",
    listingType: "sale",
    slug: "this-is-the-3-bedroom-apartment",
    description:
      "This beautiful 3-bedroom apartment offers a spacious and comfortable living experience. It features a large living room, perfect for both relaxation and entertaining guests.",
    image: unsplash("photo-1600596542815-ffad4c1539a9"),
  },
  {
    id: 2,
    title: "3-Bedroom Duplex with Full Water View",
    shortTitle: "3-Bedroom Duplex",
    location: "Marina Bay C3, Abu Dhabi",
    price: "AED 227,000",
    beds: 3,
    baths: 4,
    size: "3,000 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "stunning-3-bedroom-duplex-with-full-water-view-marina-bay-c3",
    description:
      "Discover luxury waterfront living in this spacious 3-bedroom duplex located in the prestigious Marina Bay C3. Perfectly designed for comfort and style.",
    image: unsplash("photo-1600607687939-ce8a6c25118c"),
  },
  {
    id: 3,
    title: "Luxurious Sky Villa",
    shortTitle: "Luxurious Sky Villa",
    location: "Oasis Residence, Abu Dhabi",
    price: "AED 315,000",
    beds: 3,
    baths: 5,
    size: "4,887 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "luxurious-sky-villa-oasis-residence-bedrooms-5-bathrooms-4887-sq-ft-2",
    description:
      "Welcome to your dream home in the sky! This exquisite Sky Villa in Oasis Residence blends expansive space with elegant design, offering a premium lifestyle.",
    image: unsplash("photo-1613490493576-7fde63acd811"),
  },
  {
    id: 4,
    title: "2-Bedroom Apartment, Partial Mangrove View",
    shortTitle: "2-Bedroom Apartment",
    location: "Oasis Residence, Al Reem Island",
    price: "AED 1,900,000",
    beds: 2,
    baths: 3,
    size: "1,300 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "2-bedroom-apartment-for-sale-oasis-residencepartial-mangrove-view-prime-investment-opportunity-aed-1-9-million",
    description:
      "Experience elegant living in this beautifully maintained 2-bedroom apartment at Oasis Residence. Community and partial mangrove views.",
    image: unsplash("photo-1512917774080-9991f1c4c750"),
  },
  {
    id: 5,
    title: "2-Bedroom Apartment, Big Terrace",
    shortTitle: "2-Bedroom Apartment",
    location: "Mangrove Place, Al Reem Island",
    price: "AED 1,500,000",
    beds: 2,
    baths: 2,
    size: "1,450 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "spacious-2-bedroom-apartment-for-sale-mangrove-placebig-terrace-sky-tower-view-aed-1-5-million",
    description:
      "Own a luxurious and spacious 2-bedroom apartment in the sought-after Mangrove Place, offering a bigger layout and stunning city and Sky Tower views.",
    image: unsplash("photo-1600585154340-be6161a56a0c"),
  },
  {
    id: 6,
    title: "Luxury 9-Bedroom Villa",
    shortTitle: "Luxury 9-Bedroom Villa",
    location: "Al Karamah, Abu Dhabi",
    price: "Price on Request",
    beds: 9,
    baths: 11,
    size: "8,500 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "luxury-9-bedroom-villa-al-karamah-abu-dhabispacious-layout-4-parking-spaces-9-master-bedrooms",
    description:
      "Grand 9-bedroom villa in the prestigious Al Karamah area. Exceptional space, comfort, and privacy — perfect for large families or VIP clients.",
    image: unsplash("photo-1605276374101-dee6a6d3a3a0"),
  },
  {
    id: 7,
    title: "3-Bedroom Duplex, Full Mangrove View",
    shortTitle: "3-Bedroom Duplex",
    location: "Oasis Residence, Al Reem Island",
    price: "AED 6,400,000",
    beds: 3,
    baths: null,
    size: "4,887 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "for-sale-3-bedroom-duplex-with-full-mangrove-view-oasis-residence-al-reem-island-aed-6-4-million",
    description:
      "Discover upscale living in this expansive 3-bedroom duplex at Oasis Residence, ideally located on Al Reem Island. Stunning full mangrove views.",
    image: unsplash("photo-1600047509807-ba8f99d2cdbc"),
  },
  {
    id: 8,
    title: "3-Bedroom Apartment, City & Marina Views",
    shortTitle: "3-Bedroom Apartment",
    location: "Marina Heights 1, Al Reem Island",
    price: "AED 2,300,000",
    beds: 3,
    baths: 4,
    size: "1,744 sq ft",
    status: "For Sale",
    listingType: "sale",
    slug: "for-sale-3-bedroom-apartment-with-city-partial-marina-views-marina-heights-1-al-reem-island-aed-2300000",
    description:
      "Step into modern living with this well-maintained 3-bedroom apartment in the desirable Marina Heights 1, Al Reem Island. Comfort, privacy, and scenic views.",
    image: unsplash("photo-1600566753190-17f0baa2a6c3"),
  },
  {
    id: 9,
    title: "3-Bedroom Apartment, Elegant Layout",
    shortTitle: "3-Bedroom Apartment",
    location: "Marina Bay by DAMAC, Abu Dhabi",
    price: "AED 135,000 / year",
    beds: 3,
    baths: 3,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "elegant-3-bedroom-apartment-marina-bay-by-damac-spacious-layout-prime-location-aed-135000",
    description:
      "Experience waterfront living in this beautifully designed 3-bedroom apartment in the iconic Marina Bay by DAMAC. Located on a high floor with smart layout and comfort.",
    image: unsplash("photo-1502672260266-1c1ef2d93688"),
  },
  {
    id: 10,
    title: "1-Bedroom Apartment, Sea View",
    shortTitle: "1-Bedroom Apartment",
    location: "Reflection Tower B, Abu Dhabi",
    price: "AED 90,000 / year",
    beds: 1,
    baths: 1,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "modern-1-bedroom-apartment-reflection-tower-b-sea-view-prime-location-aed-90000",
    description:
      "Step into stylish city living with this bright 1-bedroom apartment in Reflection Tower B. Perfect for singles or couples with a calming sea view.",
    image: unsplash("photo-1560448204-e02f11c3d0e2"),
  },
  {
    id: 11,
    title: "3-Bedroom Duplex, Community View",
    shortTitle: "3-Bedroom Duplex",
    location: "Najmat Tower C1, Al Reem Island",
    price: "AED 165,000 / year",
    beds: 3,
    baths: 4,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "spacious-3-bedroom-duplex-najmat-tower-c1-modern-living-community-view-aed-165000",
    description:
      "Live in comfort and style in this beautifully designed 3-bedroom duplex in Najmat Tower C1. Functional layout across two floors perfect for families.",
    image: unsplash("photo-1522708323590-d24dbb6b0267"),
  },
  {
    id: 12,
    title: "Fully Furnished 1-Bedroom Apartment",
    shortTitle: "1-Bedroom Apartment",
    location: "Electra Street, Abu Dhabi",
    price: "AED 75,000 / year",
    beds: 1,
    baths: 1,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "fully-furnished-1-bedroom-apartment-electra-street-brand-new-building-all-utilities-included-aed-75000",
    description:
      "Move into a hassle-free lifestyle with this fully furnished 1-bedroom apartment in a brand-new building on Electra Street. All utilities included.",
    image: unsplash("photo-1493809842364-78817add7ffb"),
  },
  {
    id: 13,
    title: "5-Bedroom Apartment, Full Sea View",
    shortTitle: "5-Bedroom Apartment",
    location: "Wave Tower, Corniche Road",
    price: "AED 250,000 / year",
    beds: 5,
    baths: 6,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "luxurious-5-bedroom-apartment-wave-tower-corniche-full-sea-view-all-master-bedrooms-aed-250000",
    description:
      "Live in ultimate comfort in this expansive 5-bedroom apartment in Wave Tower on Corniche Road. Full sea view, all master bedrooms.",
    image: unsplash("photo-1484154218962-a197022b5858"),
  },
  {
    id: 14,
    title: "2-Bedroom Apartment, Full Sea View",
    shortTitle: "2-Bedroom Apartment",
    location: "RDK Tower, Abu Dhabi",
    price: "AED 152,000 / year",
    beds: 2,
    baths: 3,
    size: "1,313 sq ft",
    status: "For Rent",
    listingType: "rent",
    slug: "modern-2-bedroom-apartment-rdk-tower-full-sea-view-prime-location-aed-152000",
    description:
      "Enjoy breathtaking sea views and a modern lifestyle in this spacious 2-bedroom apartment in the prestigious RDK Tower.",
    image: unsplash("photo-1560185127-6ed189bf02f4"),
  },
  {
    id: 15,
    title: "1-Bedroom Apartment, Full Sea View",
    shortTitle: "1-Bedroom Apartment",
    location: "RDK Tower, Abu Dhabi",
    price: "AED 102,000 / year",
    beds: 1,
    baths: 2,
    size: "792 sq ft",
    status: "For Rent",
    listingType: "rent",
    slug: "modern-1-bedroom-apartment-rdk-tower-unit-ull-sea-view-basement-parking-aed-102000",
    description:
      "Live by the sea in this bright and modern 1-bedroom apartment in RDK Tower. Stunning full sea views and high-end finishes.",
    image: unsplash("photo-1554995207-c18c203602cb"),
  },
  {
    id: 16,
    title: "1-Bedroom Apartment, Canal View",
    shortTitle: "1-Bedroom Apartment",
    location: "RDK Tower, Abu Dhabi",
    price: "AED 110,000 / year",
    beds: 1,
    baths: 2,
    size: "792 sq ft",
    status: "For Rent",
    listingType: "rent",
    slug: "bright-1-bedroom-apartment-rdk-tower-canal-view-basement-parking-aed-110000",
    description:
      "Experience comfortable living with beautiful canal views in this modern 1-bedroom apartment at RDK Tower. Basement parking included.",
    image: unsplash("photo-1560448075-bb485b067938"),
  },
  {
    id: 17,
    title: "Studio Apartment, Canal View",
    shortTitle: "Studio Apartment",
    location: "RDK Tower, Abu Dhabi",
    price: "AED 78,000 / year",
    beds: 0,
    baths: 1,
    size: "602 sq ft",
    status: "For Rent",
    listingType: "rent",
    slug: "modern-studio-apartment-rdk-tower-canal-view-basement-parking-aed-78000",
    description:
      "Discover smart city living in this stylish studio apartment at RDK Tower. Beautiful canal views and high-quality finishes in a prime location.",
    image: unsplash("photo-1536376072261-38c75010e6c9"),
  },
  {
    id: 18,
    title: "1-Bedroom Apartment, Canal View & Balcony",
    shortTitle: "1-Bedroom Apartment",
    location: "Burooj Views, Marina Square",
    price: "AED 110,000 / year",
    beds: 1,
    baths: 2,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "fully-furnished-1br-canal-view-balcony-marina-square-2",
    description:
      "Enjoy stylish waterfront living in this fully furnished 1-bedroom apartment in Burooj Views, Marina Square. Canal views and spacious interiors.",
    image: unsplash("photo-1502672023488-70e25813eb80"),
  },
  {
    id: 19,
    title: "1-Bedroom Apartment, Street View",
    shortTitle: "1-Bedroom Apartment",
    location: "Mangrove Place, Reem Island",
    price: "Price on Request",
    beds: 1,
    baths: 2,
    size: null,
    status: "For Rent",
    listingType: "rent",
    slug: "located-in-mangrove-place-reem-island-shams-area",
    description:
      "Located in Mangrove Place, Reem Island, Shams Area. 18th floor, flat No. 1813. Spacious layout with two washrooms, balcony and street view.",
    image: unsplash("photo-1522708323590-d24dbb6b0267"),
  },
];

export function getPropertyBySlug(slug: string): PropertyListing | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getSaleProperties(): PropertyListing[] {
  return properties.filter((p) => p.listingType === "sale");
}

export function getRentProperties(): PropertyListing[] {
  return properties.filter((p) => p.listingType === "rent");
}

const cityMatchers: Record<string, string[]> = {
  "saadiyat-island": ["saadiyat"],
  "yas-island": ["yas"],
  "al-reef": ["al reef", "reef"],
  "al-reem-island": ["al reem", "reem island"],
};

export function getPropertiesByCity(citySlug: string): PropertyListing[] {
  const matchers = cityMatchers[citySlug];
  if (!matchers) return [];
  return properties.filter((p) => {
    const loc = p.location.toLowerCase();
    return matchers.some((m) => loc.includes(m));
  });
}

export function getSimilarProperties(
  property: PropertyListing,
  limit = 3
): PropertyListing[] {
  const sameType = properties.filter(
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
