"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Star, HeartHandshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldButton from "@/components/ui/GoldButton";
import { whyLavenderFeatures } from "@/lib/data";
import { scrollReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  ShieldCheck,
  Star,
  HeartHandshake,
};

export default function WhyLavender() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollReveal(section.querySelector(".why-title"), {
        trigger: section,
        start: "top 75%",
        y: 40,
        duration: 1,
      });

      scrollReveal(section.querySelectorAll(".why-cell"), {
        trigger: section.querySelector(".why-grid"),
        start: "top 80%",
        y: 50,
        duration: 0.8,
        stagger: 0.18,
      });

      scrollReveal(section.querySelectorAll(".why-icon"), {
        trigger: section.querySelector(".why-grid"),
        start: "top 80%",
        scale: 0.5,
        duration: 0.6,
        stagger: 0.18,
        ease: "back.out(1.7)",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="why-section border-y border-plum-mid bg-plum py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mb-16 text-center">
          <SectionLabel text="Why Lavender" centered />
          <h2 className="why-title font-display text-[48px] font-light tracking-[-0.02em] text-cream">
            Interested in
            <br />
            Purchasing Your Home?
          </h2>
          <p
            className="mx-auto mt-4 max-w-[440px] font-body text-[15px] font-light"
            style={{ color: "#7A6B8A" }}
          >
            Leverage our team of qualified agents and dedicated customer care to
            ensure a smooth experience.
          </p>
        </div>

        <div className="why-grid grid gap-px bg-plum-mid md:grid-cols-3">
          {whyLavenderFeatures.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.title} className="why-cell bg-plum p-12">
                <div className="why-icon mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                  <Icon size={16} className="text-gold" />
                </div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                  {feature.eyebrow}
                </p>
                <h3 className="mb-3 font-display text-[26px] text-cream">
                  {feature.title}
                </h3>
                <p
                  className="max-w-[260px] font-body text-[14px] font-light leading-[1.7]"
                  style={{ color: "#7A6B8A" }}
                >
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <GoldButton variant="outline" label="Get In Touch" />
        </div>
      </div>
    </section>
  );
}
