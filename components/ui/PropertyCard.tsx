import Image from "next/image";
import GoldButton from "@/components/ui/GoldButton";
import type { Property } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  type: "sale" | "rent";
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  return (
    <div className="property-card group cursor-pointer overflow-hidden rounded-2xl border border-cream-border bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_48px_rgba(26,10,46,0.10)]">
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
        <p className="mb-3 font-mono text-[24px] leading-none text-plum">
          {property.price}
        </p>
        <h3 className="mb-4 font-display text-[18px] leading-[1.3] text-plum">
          {property.title}
        </h3>
        <div className="mb-4 h-px bg-cream-border" />
        <div className="mb-5 flex gap-4 font-body text-[12px] text-text-muted">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.sqft}</span>
        </div>
        <GoldButton variant="outline" label="View Details" size="sm" />
      </div>
    </div>
  );
}
