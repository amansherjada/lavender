"use client";

import GoldButton from "@/components/ui/GoldButton";
import { contactInfo, getPrimaryAgent } from "@/lib/agents";
import type { PropertyListing } from "@/lib/properties";

interface PropertyEnquireCardProps {
  property: PropertyListing;
}

export default function PropertyEnquireCard({
  property,
}: PropertyEnquireCardProps) {
  const agent = getPrimaryAgent();

  const scrollToForm = () => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-28 rounded-2xl border border-cream-border bg-white p-8">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">
        {property.status}
      </p>
      <p className="mt-2 font-mono text-[32px] leading-none text-plum">
        {property.price}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <GoldButton
          variant="solid"
          label="Enquire Now"
          className="w-full justify-center"
          onClick={scrollToForm}
        />
        <a
          href={contactInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition hover:bg-green-700"
        >
          WhatsApp
        </a>
      </div>

      <div className="my-6 h-px bg-cream-border" />

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-plum to-plum-mid font-mono text-[12px] text-gold">
          {agent.initials}
        </div>
        <div>
          <p className="font-display text-[16px] text-plum">{agent.name}</p>
          <p className="font-mono text-[10px] text-text-muted">{agent.title}</p>
        </div>
      </div>
      <a
        href={`tel:${agent.mobile.replace(/\s/g, "")}`}
        className="mt-4 block font-mono text-[13px] text-plum transition hover:text-gold"
      >
        {agent.mobile}
      </a>
      <a
        href={`mailto:${agent.email}`}
        className="mt-1 block font-body text-[13px] text-text-muted transition hover:text-gold"
      >
        {agent.email}
      </a>
    </div>
  );
}
