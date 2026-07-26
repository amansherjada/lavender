"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoldButton from "@/components/ui/GoldButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <Navbar />
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-32 text-center md:pt-40">
        <span className="font-mono text-[13px] uppercase tracking-[0.3em] text-gold">
          Error
        </span>
        <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
          Something Went Wrong
        </h1>
        <p className="mx-auto mt-5 max-w-[440px] font-body text-[15px] font-light leading-[1.7] text-text-body">
          We hit an unexpected issue loading this page. Please try again, or
          head back to the homepage.
        </p>
        <div className="mt-10 flex gap-4">
          <GoldButton label="Try Again" onClick={reset} />
          <GoldButton label="Homepage" href="/" variant="outline" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
