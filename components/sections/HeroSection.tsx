"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  heroSearchTabs,
  propertyTypes,
  heroLocations,
  bedroomOptions,
  budgetOptions,
  heroStats,
} from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [statCounts, setStatCounts] = useState(() => heroStats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(".hero-line-1", {
        y: "105%",
        duration: 1.1,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.from(".hero-line-2", {
        y: "105%",
        duration: 1.1,
        ease: "power4.out",
        delay: 0.6,
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.85,
      });

      gsap.from(".hero-search", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 1.0,
      });

      gsap.from(".hero-stat", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        delay: 1.2,
      });

      heroStats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          delay: 1.4,
          onUpdate: () => {
            const rounded = Math.round(obj.val);
            setStatCounts((prev) => {
              if (prev[i] === rounded) return prev;
              const next = [...prev];
              next[i] = rounded;
              return next;
            });
          },
        });
      });

      gsap.to(".hero-bg-image", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section relative min-h-[100dvh] overflow-hidden md:min-h-screen"
    >
      <div className="hero-bg-image absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury villa in Abu Dhabi at sunset"
          fill
          priority
          className="h-full w-full object-cover object-[center_75%] md:object-[center_40%]"
          sizes="100vw"
        />
      </div>
      {/* Mobile: fade top→bottom so villa shows lower half. Desktop: fade left→right */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-cream/95 via-cream/70 to-cream/25 md:bg-gradient-to-r md:from-cream/95 md:via-cream/80 md:to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-10 pt-24 md:flex md:min-h-screen md:flex-col md:justify-center md:px-12 md:pb-24 md:pt-28">
        <div className="hero-eyebrow mb-3 flex items-center gap-3 md:mb-5">
          <div className="h-px w-7 bg-gold" />
          <span className="rounded bg-cream/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm md:bg-cream/60 md:text-[10px]">
            Abu Dhabi Real Estate
          </span>
        </div>

        <h1 className="font-display text-[44px] font-light leading-[0.95] tracking-[-0.03em] text-plum sm:text-[56px] md:text-[96px] md:leading-[0.9] lg:text-[120px]">
          <div className="hero-line-1 block overflow-hidden">
            <span className="inline-block">Find Your</span>
          </div>
          <div className="hero-line-2 block overflow-hidden">
            <span className="inline-block">
              <em className="italic text-gold">Dream</em> Property.
            </span>
          </div>
        </h1>

        <p className="hero-sub mt-4 max-w-[480px] font-body text-[14px] font-light leading-[1.65] text-plum md:mt-8 md:text-[16px] md:leading-[1.7]">
          Discover exceptional homes across Abu Dhabi&apos;s most prestigious
          addresses. Sales, leasing, and consultancy — tailored to you.
        </p>

        <div className="hero-search mt-6 max-w-[860px] rounded-2xl border border-cream-border bg-cream/95 p-2 shadow-[0_8px_32px_rgba(26,10,46,0.15)] backdrop-blur-md md:mt-14">
          <div className="mb-2 flex gap-1">
            {heroSearchTabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex-1 rounded-lg px-2 py-2 font-mono text-[8px] uppercase tracking-[0.12em] transition-colors sm:px-3 sm:py-2.5 sm:text-[9px] md:flex-none md:rounded-xl md:px-5 md:text-[10px]",
                  activeTab === i
                    ? "bg-plum text-gold"
                    : "text-plum/60 hover:text-plum"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
            <div className="grid grid-cols-2 md:flex md:flex-1 md:items-stretch">
              {[
                { label: "Property Type", value: propertyTypes[0] },
                { label: "Location", value: heroLocations[0] },
                { label: "Bedrooms", value: bedroomOptions[2] },
                { label: "Max Budget", value: budgetOptions[0] },
              ].map((field, i) => (
                <div
                  key={field.label}
                  className={cn(
                    "flex flex-col justify-center px-3 py-2.5 md:flex-1 md:px-5 md:py-3.5",
                    i % 2 === 0 && "border-r border-plum/10",
                    i < 2 && "border-b border-plum/10 md:border-b-0",
                    i < 3 && "md:border-r md:border-plum/10"
                  )}
                >
                  <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.15em] text-plum/40">
                    {field.label}
                  </span>
                  <span className="truncate font-body text-[13px] font-normal text-plum md:text-[15px]">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full shrink-0 rounded-xl bg-plum px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-gold shadow-none transition-colors hover:bg-plum-mid md:ml-2 md:w-auto md:self-center md:px-8 md:py-3.5 md:text-[11px]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-14 md:flex md:flex-wrap md:items-center md:gap-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="hero-stat rounded-xl bg-cream/80 px-4 py-2.5 backdrop-blur-sm md:bg-cream/70 md:px-6 md:py-3"
            >
              <p
                className={`stat-number-${i} font-mono text-[26px] font-normal leading-none text-plum md:text-[36px]`}
              >
                {statCounts[i]}
                {stat.suffix}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-plum/60 md:mt-2 md:text-[10px] md:tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
