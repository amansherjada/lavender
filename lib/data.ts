export interface Location {
  id: string;
  name: string;
  image: string;
  layout: "tall" | "short" | "wide";
}

export const locations: Location[] = [
  {
    id: "loc-1",
    name: "Saadiyat Island",
    image: "/images/cities/saadiyat-island.webp",
    layout: "tall",
  },
  {
    id: "loc-2",
    name: "Yas Island",
    image: "/images/cities/yas-island.webp",
    layout: "short",
  },
  {
    id: "loc-3",
    name: "Al Reef",
    image: "/images/cities/al-reef.webp",
    layout: "short",
  },
  {
    id: "loc-4",
    name: "Al Reem Island",
    image: "/images/cities/al-reem-island.webp",
    layout: "wide",
  },
];

export const heroSearchTabs = ["All Status", "For Rent", "For Sale"] as const;

export const propertyTypes = [
  "Any",
  "Apartment",
  "Villa",
  "Duplex",
  "Studio",
  "Townhouse",
  "Penthouse",
];

export const heroLocations = [
  "Any",
  "Al Reem Island",
  "Saadiyat Island",
  "Yas Island",
  "Al Reef",
  "Corniche",
  "Khalifa City",
];

export const bedroomOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];

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
  { label: "Home", href: "/" },
  { label: "Rent", href: "/rent" },
  { label: "Buy", href: "/buy" },
  { label: "Agents", href: "/agents" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
