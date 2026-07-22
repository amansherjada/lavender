"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import PropertyCard from "@/components/ui/PropertyCard";
import { getSaleProperties } from "@/lib/properties";
import { scrollReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function BuyingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const saleProperties = getSaleProperties().slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollReveal(section.querySelector(".buying-title"), {
        trigger: section,
        start: "top 75%",
        y: 50,
        duration: 1,
      });

      scrollReveal(section.querySelectorAll(".property-card"), {
        trigger: section.querySelector(".buying-cards-grid"),
        start: "top 80%",
        y: 60,
        duration: 0.8,
        stagger: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="buy"
      ref={sectionRef}
      className="buying-section bg-cream py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <SectionLabel text="Featured Properties" />
            <h2 className="buying-title font-display text-[48px] font-light tracking-[-0.02em] text-plum md:text-[60px]">
              Buying Property
              <br />
              <em className="italic text-gold">in Abu Dhabi</em>
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-border text-text-muted transition hover:border-gold hover:text-gold"
              aria-label="Previous properties"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-border text-text-muted transition hover:border-gold hover:text-gold"
              aria-label="Next properties"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="buying-cards-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {saleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} type="sale" />
          ))}
        </div>
      </div>
    </section>
  );
}
