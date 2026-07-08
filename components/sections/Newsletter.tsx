"use client";

import { useState } from "react";
import GoldButton from "@/components/ui/GoldButton";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className="bg-plum py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
        <div>
          <h3 className="font-display text-[36px] font-light leading-[1.1] tracking-[-0.02em] text-cream">
            Stay Ahead of
            <br />
            the Market.
          </h3>
          <p
            className="mt-2 font-body text-[14px] font-light"
            style={{ color: "#7A6B8A" }}
          >
            Weekly insights on Abu Dhabi real estate.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-plum-mid bg-plum-mid px-4 py-3.5 font-body text-[14px] text-cream placeholder:text-[#7A6B8A] focus:border-gold focus:outline-none sm:w-44"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-plum-mid bg-plum-mid px-4 py-3.5 font-body text-[14px] text-cream placeholder:text-[#7A6B8A] focus:border-gold focus:outline-none sm:w-60"
          />
          <GoldButton variant="outline" label="Subscribe" />
        </div>
      </div>
    </section>
  );
}
