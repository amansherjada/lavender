import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PropertyCard from "@/components/ui/PropertyCard";
import CTAStrip from "@/components/ui/CTAStrip";
import { cities, getCityBySlug } from "@/lib/cities";
import { getPropertiesByCity } from "@/lib/properties";

interface PageProps {
  params: { city: string };
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) {
    return { title: "Location Not Found | Lavender Real Estate" };
  }
  return {
    title: `${city.title} | Lavender Real Estate`,
    description: city.description.slice(0, 155),
  };
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  const cityProperties = getPropertiesByCity(city.slug);

  return (
    <main>
      <Navbar />

      <Breadcrumbs
        topPadded
        items={[
          { label: "Home", href: "/" },
          { label: city.title.split(",")[0] },
        ]}
      />

      <section className="bg-plum pb-32 pt-8 md:pb-40 md:pt-10">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionLabel text="Exclusive Location" />
          <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-cream md:text-[56px]">
            {city.title}
          </h1>
          <p className="mt-5 max-w-[560px] font-body text-[16px] font-light text-gold">
            {city.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel text="About the Area" />
              <p className="mt-4 font-body text-[15px] font-light leading-[1.8] text-text-body">
                {city.description}
              </p>
            </div>
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                Highlights
              </p>
              <ul className="space-y-4">
                {city.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-bg">
                      <Check size={12} className="text-gold" />
                    </div>
                    <span className="font-body text-[14px] leading-[1.6] text-text-body">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cream-border bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionLabel text="Available Properties" />
          <h2 className="mt-4 font-display text-[32px] font-light text-plum md:text-[40px]">
            Properties in {city.title.split(",")[0]}
          </h2>

          {cityProperties.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cityProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type={property.listingType}
                />
              ))}
            </div>
          ) : (
            <p className="mt-10 font-body text-[15px] text-text-muted">
              No listings currently available in this area. Contact our agents
              for upcoming opportunities.
            </p>
          )}
        </div>
      </section>

      <CTAStrip
        title={`Interested in ${city.title.split(",")[0]} properties?`}
        buttons={[
          { label: "View All Properties", href: "/buy", variant: "solid" },
          { label: "Talk to an Agent", href: "/contact", variant: "outline" },
        ]}
      />

      <Footer />
    </main>
  );
}
