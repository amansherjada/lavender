import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import PropertyCard from "@/components/ui/PropertyCard";
import CTAStrip from "@/components/ui/CTAStrip";
import GoldButton from "@/components/ui/GoldButton";
import { getSaleProperties, filterProperties } from "@/lib/properties";

export const metadata = {
  title:
    "Buy Property in Abu Dhabi | Apartments, Villas & Duplexes | Lavender Real Estate",
  description:
    "Browse premium properties for sale in Abu Dhabi. Apartments, villas, duplexes and penthouses across Al Reem Island, Saadiyat Island, Yas Island and more.",
};

interface BuyPageProps {
  searchParams: {
    type?: string;
    location?: string;
    beds?: string;
    budget?: string;
  };
}

export default function BuyPage({ searchParams }: BuyPageProps) {
  const saleProperties = filterProperties(getSaleProperties(), {
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
        label="Properties for Sale"
        title="Buy Property in Abu Dhabi"
        subtitle="Explore premium apartments, villas, duplexes and penthouses across Abu Dhabi's most sought-after communities."
      />

      <section className="bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {saleProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {saleProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="sale"
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
                  ? "Try adjusting your filters, or get in touch and we'll help you find the right property."
                  : "Check back soon — new listings are added regularly."}
              </p>
              {hasFilters && (
                <div className="mt-6">
                  <GoldButton label="View All Properties" href="/buy" variant="outline" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTAStrip
        title="Can't find what you're looking for?"
        subtitle="Talk to our agents — we'll help you find the right property."
        buttons={[{ label: "Contact Us", href: "/contact", variant: "solid" }]}
      />

      <Footer />
    </main>
  );
}
