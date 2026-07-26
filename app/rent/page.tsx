import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import PropertyCard from "@/components/ui/PropertyCard";
import CTAStrip from "@/components/ui/CTAStrip";
import GoldButton from "@/components/ui/GoldButton";
import { getRentProperties, filterProperties } from "@/lib/properties";

export const metadata = {
  title:
    "Rent Property in Abu Dhabi | Apartments & Homes | Lavender Real Estate",
  description:
    "Find apartments and homes for rent in Abu Dhabi. Studio to 5-bedroom units across RDK Tower, Marina Bay, Wave Tower, Electra Street and more.",
};

interface RentPageProps {
  searchParams: {
    type?: string;
    location?: string;
    beds?: string;
    budget?: string;
  };
}

export default function RentPage({ searchParams }: RentPageProps) {
  const rentProperties = filterProperties(getRentProperties(), {
    type: searchParams.type,
    location: searchParams.location,
    beds: searchParams.beds,
    budget: searchParams.budget,
  });
  const hasFilters = Object.values(searchParams).some(Boolean);

  return (
    <main>
      <Navbar />
      <PageHero
        label="Properties for Rent"
        title="Rent Property in Abu Dhabi"
        subtitle="From stylish studios to expansive family apartments — find your next home across Abu Dhabi's prime locations."
      />

      <section className="bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {rentProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="rent"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <p className="font-display text-[24px] text-plum">
                No properties match your search
              </p>
              <p className="mt-2 max-w-[420px] font-body text-[14px] text-text-muted">
                {hasFilters
                  ? "Try adjusting your filters, or get in touch and we'll help you find the right rental."
                  : "Check back soon — new listings are added regularly."}
              </p>
              {hasFilters && (
                <div className="mt-6">
                  <GoldButton label="View All Rentals" href="/rent" variant="outline" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTAStrip
        title="Can't find what you're looking for?"
        subtitle="Talk to our agents — we'll match you with the right rental."
        buttons={[{ label: "Contact Us", href: "/contact", variant: "solid" }]}
      />

      <Footer />
    </main>
  );
}
