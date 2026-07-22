import GoldButton from "@/components/ui/GoldButton";
import { cn } from "@/lib/utils";

interface CTAButton {
  label: string;
  href: string;
  variant?: "solid" | "outline";
}

interface CTAStripProps {
  title: string;
  subtitle?: string;
  buttons: CTAButton[];
  variant?: "cream" | "plum";
  className?: string;
}

export default function CTAStrip({
  title,
  subtitle,
  buttons,
  variant = "cream",
  className,
}: CTAStripProps) {
  const isPlum = variant === "plum";

  return (
    <section
      className={cn(
        "py-20 md:py-28",
        isPlum ? "bg-plum" : "bg-cream border-t border-cream-border",
        className
      )}
    >
      <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
        <h2
          className={cn(
            "font-display text-[32px] font-light leading-[1.2] tracking-[-0.02em] md:text-[40px]",
            isPlum ? "text-cream" : "text-plum"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "mx-auto mt-4 max-w-[480px] font-body text-[15px] font-light leading-[1.7]",
              isPlum ? "text-[#B8A9C8]" : "text-text-body"
            )}
          >
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {buttons.map((btn) => (
            <GoldButton
              key={btn.label}
              variant={btn.variant ?? "solid"}
              label={btn.label}
              href={btn.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
