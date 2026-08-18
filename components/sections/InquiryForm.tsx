"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Zap, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldButton from "@/components/ui/GoldButton";
import Turnstile from "@/components/ui/Turnstile";
import {
  inquiryTypes,
  userTypes,
  formLocations,
  formPropertyTypes,
  priceOptions,
  sizeOptions,
  bedOptions,
  bathOptions,
} from "@/lib/data";
import { inquirySchema, type InquiryFormData } from "@/lib/schemas";
import { scrollReveal } from "@/lib/scrollReveal";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-cream-border bg-cream px-4 py-3.5 font-body text-[14px] text-plum placeholder:text-text-muted transition-all duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/10";

const labelClass =
  "mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted";

gsap.registerPlugin(ScrollTrigger);

function SuccessState() {
  useEffect(() => {
    const path = document.querySelector(".check-path") as SVGPathElement | null;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <svg width="64" height="64" viewBox="0 0 64 64" className="mb-6">
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="#B8966E"
          strokeWidth="2"
        />
        <path
          className="check-path"
          d="M20 32 L28 40 L44 24"
          fill="none"
          stroke="#B8966E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="font-display text-[32px] text-plum">Thank You</h3>
      <p className="mt-2 font-body text-[15px] text-text-body">
        We&apos;ll be in touch within 24 hours.
      </p>
    </div>
  );
}

interface InquiryFormProps {
  defaultInquiryType?: "Purchase" | "Rent";
  source?: string;
  compact?: boolean;
}

export default function InquiryForm({
  defaultInquiryType,
  source = "lavenderuae.com – Homepage",
  compact = false,
}: InquiryFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      scrollReveal(section.querySelector(".form-left"), {
        trigger: section,
        start: "top 75%",
        x: -50,
        duration: 1,
      });

      scrollReveal(section.querySelector(".form-card"), {
        trigger: section,
        start: "top 75%",
        x: 50,
        duration: 1,
      });

      scrollReveal(section.querySelectorAll(".form-field"), {
        trigger: section.querySelector(".form-card"),
        start: "top 80%",
        y: 15,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiry_type: defaultInquiryType ?? "",
      gdpr_consent: false,
    },
  });

  const gdprChecked = watch("gdpr_consent");

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitError("");

    if (!turnstileToken) {
      setSubmitError("Please complete the verification check and try again.");
      return;
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, turnstileToken }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error("Inquiry form webhook submission failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id={compact ? "enquire" : "contact"}
      ref={sectionRef}
      className={cn(
        "form-section bg-cream",
        compact ? "py-16 md:py-24" : "py-20 md:py-32 lg:py-40"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div
          className={cn(
            "grid grid-cols-1 gap-16",
            compact ? "lg:grid-cols-1" : "lg:grid-cols-5"
          )}
        >
          {!compact && (
            <div className="form-left lg:col-span-2">
              <SectionLabel text="Get In Touch" />
              <h2 className="font-display text-[48px] font-light leading-[1.05] tracking-[-0.02em] text-plum">
                Talk to
                <br />
                <em className="italic text-gold">Our Experts.</em>
              </h2>
              <p className="mb-10 mt-6 max-w-[360px] font-body text-[15px] font-light leading-[1.7] text-text-body">
                Send us your requirements and we&apos;ll connect you with the
                right specialist within 24 hours.
              </p>

              {[
                { icon: MapPin, text: "200+ locations across Abu Dhabi" },
                { icon: Zap, text: "24-hour response guarantee" },
                { icon: Users, text: "No fees, no pressure" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="mb-5 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream-border bg-gold-bg">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <p className="font-body text-[14px] text-text-body">{text}</p>
                </div>
              ))}

              <p className="mt-10 font-mono text-[18px] text-plum">
                +971 55 433 4369
              </p>
            </div>
          )}

          <div className={compact ? "" : "lg:col-span-3"}>
            {compact && (
              <div className="mb-10 text-center">
                <SectionLabel text="Enquire" centered />
                <h2 className="font-display text-[36px] font-light tracking-[-0.02em] text-plum md:text-[48px]">
                  Interested in this property?
                </h2>
              </div>
            )}
            <div className="form-card rounded-2xl border border-cream-border bg-white p-10">
              {submitted ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                    {...register("website")}
                  />
                  <div className="form-field">
                    <label className={labelClass}>Inquiry Type</label>
                    <select className={inputClass} {...register("inquiry_type")}>
                      <option value="">Select type</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.inquiry_type && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.inquiry_type.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label className={labelClass}>I&apos;m a</label>
                    <select className={inputClass} {...register("user_type")}>
                      <option value="">Select role</option>
                      {userTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.user_type && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.user_type.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input
                        className={inputClass}
                        placeholder="First name"
                        {...register("first_name")}
                      />
                      {errors.first_name && (
                        <p className="mt-1 font-mono text-[10px] text-red-500">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input
                        className={inputClass}
                        placeholder="Last name"
                        {...register("last_name")}
                      />
                      {errors.last_name && (
                        <p className="mt-1 font-mono text-[10px] text-red-500">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label className={labelClass}>Mobile Number</label>
                    <div className="flex items-center rounded-xl border border-cream-border bg-cream px-4 py-3.5 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/10">
                      <span className="mr-2 border-r border-cream-border pr-3 font-mono text-gold">
                        +971
                      </span>
                      <input
                        className="flex-1 bg-transparent font-body text-[14px] text-plum placeholder:text-text-muted focus:outline-none"
                        placeholder="50 123 4567"
                        {...register("mobile")}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label className={labelClass}>Location</label>
                    <select className={inputClass} {...register("location")}>
                      <option value="">Select location</option>
                      {formLocations.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label className={labelClass}>Property Type</label>
                    <select
                      className={inputClass}
                      {...register("property_type")}
                    >
                      <option value="">Select type</option>
                      {formPropertyTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.property_type && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.property_type.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Max Price</label>
                      <select className={inputClass} {...register("max_price")}>
                        <option value="">Any</option>
                        {priceOptions.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Min Size</label>
                      <select className={inputClass} {...register("min_size")}>
                        <option value="">Any</option>
                        {sizeOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Beds</label>
                      <select className={inputClass} {...register("beds")}>
                        <option value="">Any</option>
                        {bedOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Baths</label>
                      <select className={inputClass} {...register("baths")}>
                        <option value="">Any</option>
                        {bathOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        {...register("gdpr_consent")}
                      />
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                          gdprChecked
                            ? "border-plum bg-plum"
                            : "border-cream-border bg-cream"
                        )}
                      >
                        {gdprChecked && (
                          <svg
                            className="h-2.5 w-2.5 text-white"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              d="M1 5 L4.5 8.5 L11 1.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="ml-2 font-body text-[13px] text-text-muted">
                        I agree to be contacted about my inquiry and to the{" "}
                        <a href="/privacy" className="underline hover:text-plum">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.gdpr_consent && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.gdpr_consent.message}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <Turnstile
                      onVerify={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                    />
                  </div>

                  {submitError && (
                    <p className="font-mono text-[10px] text-red-500">
                      {submitError}
                    </p>
                  )}

                  <div className="form-field">
                    <GoldButton
                      variant="solid"
                      label={isSubmitting ? "Submitting..." : "Submit Inquiry"}
                      type="submit"
                      className="w-full justify-center"
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
