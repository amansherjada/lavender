import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import PropertyCard from "@/components/ui/PropertyCard";
import InquiryForm from "@/components/sections/InquiryForm";
import PropertyEnquireCard from "@/components/sections/PropertyEnquireCard";
import {
  properties,
  getPropertyBySlug,
  getSimilarProperties,
} from "@/lib/properties";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) {
    return { title: "Property Not Found | Lavender Real Estate" };
  }
  const title = `${property.shortTitle ?? property.title} | ${property.location} | Lavender Real Estate`;
  const description = property.description.slice(0, 155);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: property.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.image],
    },
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property, 3);
  const inquiryType = property.listingType === "sale" ? "Purchase" : "Rent";

  const propertyJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://lavenderuae.com/property/${property.slug}`,
    image: property.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "AE",
    },
    numberOfBedroomsTotal: property.beds,
    ...(property.baths != null ? { numberOfBathroomsTotal: property.baths } : {}),
    offers: {
      "@type": "Offer",
      price: property.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "AED",
      availability:
        property.status === "For Sale"
          ? "https://schema.org/InStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />
      <Navbar />

      <section className="relative h-[50vh] min-h-[360px] w-full md:h-[60vh]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto max-w-[1280px]">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-gold">
              {property.status}
            </span>
            <h1 className="mt-4 max-w-[800px] font-display text-[32px] font-light leading-[1.15] text-cream md:text-[48px]">
              {property.title}
            </h1>
            <p className="mt-3 font-mono text-[20px] text-gold md:text-[24px]">
              {property.price}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center gap-2 text-text-muted">
                <MapPin size={16} className="text-gold" />
                <span className="font-body text-[14px]">{property.location}</span>
              </div>

              <h2 className="font-display text-[32px] font-light text-plum md:text-[40px]">
                {property.title}
              </h2>

              <p className="mt-6 font-body text-[15px] font-light leading-[1.8] text-text-body">
                {property.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 rounded-xl border border-cream-border bg-white px-5 py-4">
                  <Bed size={18} className="text-gold" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                      Beds
                    </p>
                    <p className="font-body text-[14px] text-plum">
                      {property.beds === 0 ? "Studio" : property.beds}
                    </p>
                  </div>
                </div>
                {property.baths != null && (
                  <div className="flex items-center gap-3 rounded-xl border border-cream-border bg-white px-5 py-4">
                    <Bath size={18} className="text-gold" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                        Baths
                      </p>
                      <p className="font-body text-[14px] text-plum">
                        {property.baths}
                      </p>
                    </div>
                  </div>
                )}
                {property.size && (
                  <div className="flex items-center gap-3 rounded-xl border border-cream-border bg-white px-5 py-4">
                    <Maximize size={18} className="text-gold" />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                        Size
                      </p>
                      <p className="font-body text-[14px] text-plum">
                        {property.size}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <PropertyEnquireCard property={property} />
            </div>
          </div>
        </div>
      </section>

      <InquiryForm
        defaultInquiryType={inquiryType}
        source={`lavenderuae.com – Property: ${property.slug}`}
        compact
      />

      {similar.length > 0 && (
        <section className="border-t border-cream-border bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <SectionLabel text="Similar Properties" />
            <h2 className="mt-4 font-display text-[32px] font-light text-plum md:text-[40px]">
              You May Also Like
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  type={p.listingType}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
