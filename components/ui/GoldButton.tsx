"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  variant?: "solid" | "outline";
  label: string;
  size?: "sm" | "default";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function GoldButton({
  variant = "solid",
  label,
  size = "default",
  className,
  onClick,
  type = "button",
}: GoldButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300",
        size === "sm" ? "px-5 py-2.5" : "px-8 py-3.5",
        variant === "solid"
          ? "btn-gold-solid bg-plum text-gold hover:bg-plum-mid"
          : "btn-gold-outline border border-gold bg-transparent text-gold hover:bg-gold-bg",
        className
      )}
    >
      {label}
      <ArrowRight size={13} strokeWidth={1.5} />
    </button>
  );
}
