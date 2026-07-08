export interface Property {
  id: string;
  image: string;
  price: string;
  title: string;
  beds: number;
  baths: number;
  sqft: string;
}

export interface Location {
  id: string;
  name: string;
  image: string;
  layout: "tall" | "short" | "wide";
}

export const saleProperties: Property[] = [
  {
    id: "sale-1",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    price: "AED 1,900,000",
    title: "3-Bedroom Apartment, Ocean Residences",
    beds: 3,
    baths: 2,
    sqft: "1,744 ft²",
  },
  {
    id: "sale-2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    price: "AED 3,450,000",
    title: "4-Bedroom Villa, Saadiyat Beach",
    beds: 4,
    baths: 4,
    sqft: "3,200 ft²",
  },
  {
    id: "sale-3",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    price: "AED 2,750,000",
    title: "2-Bedroom Penthouse, Al Reem Island",
    beds: 2,
    baths: 3,
    sqft: "2,100 ft²",
  },
  {
    id: "sale-4",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    price: "AED 5,200,000",
    title: "5-Bedroom Villa, Yas Acres",
    beds: 5,
    baths: 5,
    sqft: "4,800 ft²",
  },
  {
    id: "sale-5",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    price: "AED 1,650,000",
    title: "2-Bedroom Apartment, Al Reef",
    beds: 2,
    baths: 2,
    sqft: "1,350 ft²",
  },
  {
    id: "sale-6",
    image:
      "https://images.unsplash.com/photo-1605276374101-dee6a6d3a3a0?w=800&q=80",
    price: "AED 4,100,000",
    title: "3-Bedroom Townhouse, Saadiyat",
    beds: 3,
    baths: 3,
    sqft: "2,900 ft²",
  },
];

export const rentProperties: Property[] = [
  {
    id: "rent-1",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    price: "AED 85,000/yr",
    title: "1-Bedroom Apartment, Corniche",
    beds: 1,
    baths: 1,
    sqft: "850 ft²",
  },
  {
    id: "rent-2",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    price: "AED 120,000/yr",
    title: "2-Bedroom Apartment, Al Reem Island",
    beds: 2,
    baths: 2,
    sqft: "1,200 ft²",
  },
  {
    id: "rent-3",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    price: "AED 180,000/yr",
    title: "3-Bedroom Apartment, Saadiyat",
    beds: 3,
    baths: 2,
    sqft: "1,800 ft²",
  },
  {
    id: "rent-4",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    price: "AED 95,000/yr",
    title: "Studio, Yas Island",
    beds: 1,
    baths: 1,
    sqft: "650 ft²",
  },
  {
    id: "rent-5",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    price: "AED 250,000/yr",
    title: "4-Bedroom Villa, Khalifa City",
    beds: 4,
    baths: 3,
    sqft: "3,100 ft²",
  },
  {
    id: "rent-6",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    price: "AED 140,000/yr",
    title: "2-Bedroom Apartment, Al Reef",
    beds: 2,
    baths: 2,
    sqft: "1,450 ft²",
  },
];

export const locations: Location[] = [
  {
    id: "loc-1",
    name: "Saadiyat Island",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    layout: "tall",
  },
  {
    id: "loc-2",
    name: "Yas Island",
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31fd7f9f5?w=800&q=80",
    layout: "short",
  },
  {
    id: "loc-3",
    name: "Al Reef",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    layout: "short",
  },
  {
    id: "loc-4",
    name: "Al Reem Island",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    layout: "wide",
  },
];

export const heroSearchTabs = ["All Status", "For Rent", "For Sale"] as const;

export const propertyTypes = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Studio",
];

export const heroLocations = [
  "Saadiyat Island",
  "Yas Island",
  "Al Reem Island",
  "Al Reef",
  "Corniche",
  "Khalifa City",
];

export const bedroomOptions = ["Studio", "1", "2", "3", "4", "5+"];

export const budgetOptions = [
  "Any",
  "Up to AED 1M",
  "AED 1M – 3M",
  "AED 3M – 5M",
  "AED 5M+",
];

export const inquiryTypes = [
  "Purchase",
  "Rent",
  "Sell",
  "Valuation",
  "Mortgage",
];

export const userTypes = ["Buyer", "Real Estate Agent", "Property Owner"];

export const formLocations = [
  "Saadiyat Island",
  "Yas Island",
  "Al Reem Island",
  "Al Reef",
  "Corniche",
  "Khalifa City",
  "Al Maryah Island",
  "Other",
];

export const formPropertyTypes = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Studio",
  "Commercial",
];

export const priceOptions = [
  "Any",
  "Up to AED 1M",
  "AED 1M – 3M",
  "AED 3M – 5M",
  "AED 5M – 10M",
  "AED 10M+",
];

export const sizeOptions = [
  "Any",
  "500 – 1,000 ft²",
  "1,000 – 2,000 ft²",
  "2,000 – 3,000 ft²",
  "3,000+ ft²",
];

export const bedOptions = ["Studio", "1", "2", "3", "4", "5+"];

export const bathOptions = ["1", "2", "3", "4", "5+"];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rent", href: "#rent" },
  { label: "Buy", href: "#buy" },
  { label: "Locations", href: "#locations" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const whyLavenderFeatures = [
  {
    icon: "ShieldCheck" as const,
    eyebrow: "Trusted Expertise",
    title: "Licensed & Verified",
    body: "Every property and agent is fully licensed and verified by Abu Dhabi authorities.",
  },
  {
    icon: "Star" as const,
    eyebrow: "Premium Service",
    title: "White-Glove Care",
    body: "From first inquiry to key handover, our team delivers a seamless luxury experience.",
  },
  {
    icon: "HeartHandshake" as const,
    eyebrow: "Client First",
    title: "Dedicated Support",
    body: "Your dedicated agent is available around the clock to guide every step of your journey.",
  },
];

export const howItWorksSteps = [
  {
    step: "Step 01",
    title: "Contact Our Experts",
    body: "Reach out via our inquiry form or call. We'll match you with the right specialist agent.",
  },
  {
    step: "Step 02",
    title: "Schedule a Viewing",
    body: "Visit in person or take a virtual tour. We arrange everything around your schedule.",
  },
  {
    step: "Step 03",
    title: "Close the Deal",
    body: "Complete your transfer within a week. Our team handles all paperwork end to end.",
  },
];

export const heroStats = [
  { value: 500, suffix: "+", label: "Properties" },
  { value: 12, suffix: "", label: "Yrs Experience" },
  { value: 1200, suffix: "+", label: "Clients" },
  { value: 4, suffix: "", label: "UAE Locations" },
];
