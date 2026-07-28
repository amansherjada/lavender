export interface Agent {
  name: string;
  title: string;
  company: string;
  mobile: string;
  office: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  license: string;
  languages: string;
  serviceArea: string;
  experience?: string;
  specialties?: string;
  bio?: string;
  address: string;
  rating?: number;
  slug: string;
  initials: string;
  photo?: string;
}

export const agents: Agent[] = [
  {
    name: "Mr. Muhad Aboobucker",
    title: "Sales and Leasing Manager",
    company: "Lavender Real Estate",
    mobile: "+971 55 291 5727",
    office: "+971 55 433 4369",
    email: "muhad@lavenderuae.com",
    whatsapp: "+971 55 291 5727",
    linkedin: "https://www.linkedin.com/in/muhad-aboobucker-212585268",
    license: "CN-4659921",
    languages: "English, Arabic, Hindi, Urdu",
    serviceArea: "Abu Dhabi",
    experience: "25 Years",
    specialties:
      "Sales, Leasing, Property Management, Investment Advisory",
    bio: "Dynamic and results-oriented real estate executive with over two decades of experience in leading high-performing teams and driving strategic initiatives. Proven track record in overseeing all aspects of real estate operations, from acquisitions and development to leasing and property management. Expert at fostering strong relationships with investors, partners and stakeholders. Deep knowledge of the UAE and Qatar real estate markets.",
    address:
      "Office No. 222, Eldorado Tower Block A, Electra Street, Abu Dhabi",
    rating: 5,
    slug: "muhad-aboobucker",
    initials: "MA",
    photo: "/images/agents/muhad-aboobucker.jpg",
  },
  {
    name: "Vishwa Rasanga",
    title: "Property Advisor",
    company: "Lavender Real Estate",
    mobile: "+971 55 438 9279",
    office: "+971 55 433 4369",
    email: "vishwa@lavenderuae.com",
    whatsapp: "+971 55 438 9279",
    linkedin:
      "https://www.linkedin.com/in/vishwa-rasanga-7b0bb0157",
    license: "202503425619",
    languages: "English",
    serviceArea: "Abu Dhabi",
    bio: "Vishwa Rasanga is a Property Advisor at Lavender Real Estate, dedicated to helping clients navigate Abu Dhabi's property market with clarity and care. Whether guiding a first-time buyer, matching a tenant with the right home, or advising an investor, Vishwa brings a client-first approach to every enquiry — ensuring a smooth, transparent experience from the first conversation through to handover.",
    address:
      "Office No. 222, Eldorado Tower Block A, Electra Street, Abu Dhabi",
    slug: "vishwa-rasanga",
    initials: "VR",
    photo: "/images/agents/vishwa-rasanga.jpg",
  },
];

export const contactInfo = {
  name: "Muhad Aboobucker",
  title: "Sales & Leasing Manager",
  phone: "+971 55 433 4369",
  whatsapp: "+971 55 291 5727",
  email: "muhad@lavenderuae.com",
  generalEmail: "Info@lavenderuae.com",
  address:
    "Office No. 222, Eldorado Tower Block A, Electra Street, Abu Dhabi – UAE",
  linkedin: "https://www.linkedin.com/in/muhad-aboobucker-212585268",
  license: "CN-4659921",
  whatsappUrl: "https://wa.me/971552915727",
};

export function getPrimaryAgent(): Agent {
  return agents[0];
}
