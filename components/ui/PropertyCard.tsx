import Image from "next/image";
import Link from "next/link";
import type { PropertyListing } from "@/lib/properties";

interface PropertyCardProps {
  property: PropertyListing;
  type: "sale" | "rent";
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  const bedsLabel =
    property.beds === 0 ? "Studio" : `${property.beds} Beds`;

  return (
    <Link
      href={`/property/${property.slug}`}
      className="property-card group block cursor-pointer overflow-hidden rounded-2xl border border-cream-border bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_48px_rgba(26,10,46,0.10)]"
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={
            type === "sale"
              ? "absolute left-4 top-4 rounded-full border border-gold/25 bg-gold/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-gold-dim"
              : "absolute left-4 top-4 rounded-full border border-plum/15 bg-plum/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-plum-light"
          }
        >
          {type === "sale" ? "For Sale" : "For Rent"}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
          Starting from
        </p>
        <p className="mb-2 font-mono text-[24px] leading-none text-plum">
          {property.price}
        </p>
        <h3 className="mb-2 font-display text-[18px] leading-[1.3] text-plum">
          {property.title}
        </h3>
        <p className="mb-4 font-body text-[12px] text-text-muted">
          {property.location}
        </p>
        <div className="mb-4 h-px bg-cream-border" />
        <div className="mb-5 flex flex-wrap gap-4 font-body text-[12px] text-text-muted">
          <span>{bedsLabel}</span>
          {property.baths != null && <span>{property.baths} Baths</span>}
          {property.size && <span>{property.size}</span>}
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-gold transition-all duration-300 group-hover:bg-gold-bg">
          View Details
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
