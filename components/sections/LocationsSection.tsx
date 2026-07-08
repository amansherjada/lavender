"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import LocationCard from "@/components/ui/LocationCard";
import { locations } from "@/lib/data";
import { scrollReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const tall = locations.find((l) => l.layout === "tall")!;
  const shorts = locations.filter((l) => l.layout === "short");
  const wide = locations.find((l) => l.layout === "wide")!;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollReveal(section.querySelectorAll(".location-card"), {
        trigger: section,
        start: "top 78%",
        y: 50,
        scale: 0.97,
        duration: 0.9,
        stagger: 0.12,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="locations-section border-y border-cream-border bg-white py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mb-16 text-center">
          <SectionLabel text="Exclusive Locations" centered />
          <h2 className="font-display text-[48px] font-light tracking-[-0.02em] text-plum">
            Discover the Best
            <br />
            <em className="italic text-gold">Locations in the UAE</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[400px] font-body text-[15px] font-light text-text-muted">
            Four iconic destinations. Endless possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-[500px]">
            <LocationCard name={tall.name} image={tall.image} />
          </div>
          <div className="flex flex-col gap-6">
            {shorts.map((loc) => (
              <div key={loc.id} className="h-[240px]">
                <LocationCard name={loc.name} image={loc.image} />
              </div>
            ))}
          </div>
          <div className="col-span-1 h-[280px] md:col-span-2">
            <LocationCard name={wide.name} image={wide.image} />
          </div>
        </div>
      </div>
    </section>
  );
}
