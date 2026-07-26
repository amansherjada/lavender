"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import { scrollReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const siteLinks = [
  { label: "About", href: "/about" },
  { label: "Rent", href: "/rent" },
  { label: "Buy", href: "/buy" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      scrollReveal(footer.querySelectorAll(".footer-col"), {
        trigger: footer.querySelector(".footer-grid"),
        start: "top 90%",
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#100620] pb-10 pt-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="footer-grid grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="footer-col col-span-2 md:col-span-1">
            <Image
              src="/images/logo/lavender-logo-original.svg"
              alt="Lavender Real Estate"
              width={160}
              height={100}
              unoptimized
              className="h-16 w-auto"
            />
            <p className="mt-5 max-w-[220px] font-body text-[13px] font-light leading-[1.8] text-[#7A6B8A]">
              Lavender Real Estate offers a full range of services — sales,
              leasing, consultancy, and mortgage solutions.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="tel:+971554334369"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-plum-mid text-[#7A6B8A] transition hover:border-gold hover:text-gold"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
              Site
            </p>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13px] text-[#7A6B8A] transition hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
              Contact
            </p>
            <div className="font-body text-[13px] leading-[2] text-[#7A6B8A]">
              <p>
                Office No. 222, Eldorado Tower Block A, Electra Street, Abu
                Dhabi – UAE
              </p>
              <p>+971 55 433 4369</p>
              <p>Info@lavenderuae.com</p>
            </div>
          </div>

          <div className="footer-col">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
              Hours
            </p>
            <div className="font-body text-[13px] leading-[2] text-[#7A6B8A]">
              <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
              <p>Sat: 10:00 AM – 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-plum-mid pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] text-[#5A4B6A]">
            © 2025 Lavender Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-mono text-[10px] text-[#5A4B6A] transition hover:text-cream"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] text-[#5A4B6A] transition hover:text-cream"
            >
              Terms &amp; Conditions
            </Link>
            <p className="font-mono text-[10px] text-[#5A4B6A]">
              Abu Dhabi, UAE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
