"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldButton from "@/components/ui/GoldButton";
import { howItWorksSteps } from "@/lib/data";
import { scrollReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollReveal(section.querySelector(".how-left"), {
        trigger: section,
        start: "top 70%",
        x: -40,
        duration: 1,
      });

      scrollReveal(section.querySelectorAll(".step-card"), {
        trigger: section.querySelector(".how-right"),
        start: "top 78%",
        x: 40,
        duration: 0.85,
        stagger: 0.2,
      });

      scrollReveal(section.querySelectorAll(".step-number"), {
        trigger: section.querySelector(".how-right"),
        start: "top 78%",
        scale: 1.3,
        filter: "blur(8px)",
        duration: 0.9,
        stagger: 0.2,
        ease: "power2.out",
      });

      const lines = linesRef.current?.querySelectorAll(".dashed-line");
      lines?.forEach((line) => {
        const svg = line.querySelector("line");
        if (!svg) return;
        const length = 40;
        svg.setAttribute("stroke-dasharray", String(length));
        svg.setAttribute("stroke-dashoffset", String(length));

        gsap.to(svg, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-section border-y border-cream-border bg-white py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="how-left lg:sticky lg:top-32 lg:w-[380px] lg:shrink-0 lg:self-start">
            <SectionLabel text="The Process" />
            <h2 className="font-display text-[48px] font-light leading-[1.05] tracking-[-0.02em] text-plum">
              How It Works
            </h2>
            <p className="mb-10 mt-6 font-body text-[15px] font-light leading-[1.7] text-text-body">
              Three simple steps to your perfect property.
            </p>
            <GoldButton variant="solid" label="Start Your Search" />
          </div>

          <div ref={linesRef} className="how-right flex flex-1 flex-col gap-6">
            {howItWorksSteps.map((step, i) => (
              <div key={step.step}>
                <div className="step-card relative rounded-2xl border border-cream-border bg-cream p-10 transition-colors hover:border-gold/30">
                  <span className="step-number absolute right-8 top-6 select-none font-display text-[100px] font-light leading-none text-[rgba(26,10,46,0.05)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <SectionLabel text={step.step} />
                  <h3 className="mb-3 font-display text-[28px] text-plum">
                    {step.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.7] text-text-body">
                    {step.body}
                  </p>
                </div>
                {i < howItWorksSteps.length - 1 && (
                  <div className="dashed-line flex justify-center py-0">
                    <svg width="2" height="40" className="overflow-visible">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="40"
                        stroke="rgba(184,150,110,0.3)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
