"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { useEffect } from "react";
import GoldButton from "@/components/ui/GoldButton";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-cream-border bg-cream px-4 py-3.5 font-body text-[14px] text-plum placeholder:text-text-muted transition-all duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/10";

const labelClass =
  "mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted";

function SuccessState() {
  useEffect(() => {
    const path = document.querySelector(
      ".contact-check-path"
    ) as SVGPathElement | null;
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
          className="contact-check-path"
          d="M20 32 L28 40 L44 24"
          fill="none"
          stroke="#B8966E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="font-display text-[28px] text-plum">Thank you</h3>
      <p className="mt-2 font-body text-[15px] text-text-body">
        We&apos;ll be in touch soon.
      </p>
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { gdpr_consent: false },
  });

  const gdprChecked = watch("gdpr_consent");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    const webhookUrl = process.env.NEXT_PUBLIC_PABBLY_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl.includes("YOUR_KEY")) {
      console.error(
        "NEXT_PUBLIC_PABBLY_WEBHOOK_URL is not configured — form submission cannot be delivered."
      );
      setSubmitError(
        "This form isn't fully set up yet. Please call or email us directly instead."
      );
      return;
    }

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submitted_at: new Date().toISOString(),
          source: "lavenderuae.com – Contact Page",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form webhook submission failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitted) return <SuccessState />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <div>
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

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          className={inputClass}
          placeholder="+971 50 123 4567"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 font-mono text-[10px] text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>Subject</label>
        <input
          className={inputClass}
          placeholder="How can we help?"
          {...register("subject")}
        />
        {errors.subject && (
          <p className="mt-1 font-mono text-[10px] text-red-500">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          className={cn(inputClass, "min-h-[120px] resize-y")}
          placeholder="Tell us about your requirements..."
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 font-mono text-[10px] text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
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

      {submitError && (
        <p className="font-mono text-[10px] text-red-500">{submitError}</p>
      )}

      <GoldButton
        variant="solid"
        label={isSubmitting ? "Sending..." : "Send Message"}
        type="submit"
        className="w-full justify-center"
      />
    </form>
  );
}
