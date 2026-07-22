"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import GoldButton from "@/components/ui/GoldButton";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".navbar", {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.8,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "navbar fixed top-0 z-50 w-full border-b border-cream-border bg-cream/95 backdrop-blur-md transition-all duration-300",
          scrolled && "bg-cream/98 shadow-sm backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-12 md:py-5">
          <a
            href="/"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            <div className="h-px w-6 bg-gold" />
            <span className="font-mono text-[13px] uppercase tracking-[0.3em] text-plum">
              LAVENDER
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-plum"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <GoldButton
              variant="solid"
              label="List Property"
              size="sm"
              href="/contact"
            />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-plum lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream lg:hidden"
        >
          <div ref={linksRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-[14px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-plum"
              >
                {link.label}
              </a>
            ))}
            <GoldButton
              variant="solid"
              label="List Property"
              size="sm"
              href="/contact"
              onClick={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
