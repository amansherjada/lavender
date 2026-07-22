import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  variant?: "cream" | "plum";
  className?: string;
}

export default function PageHero({
  label,
  title,
  subtitle,
  variant = "cream",
  className,
}: PageHeroProps) {
  const isPlum = variant === "plum";

  return (
    <section
      className={cn(
        "pt-32 pb-20 md:pt-40 md:pb-28",
        isPlum ? "bg-plum" : "bg-cream",
        className
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionLabel
          text={label}
          className={isPlum ? "[&_span]:text-gold [&_div]:bg-gold" : undefined}
        />
        <h1
          className={cn(
            "mt-4 max-w-[720px] font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] md:text-[56px]",
            isPlum ? "text-cream" : "text-plum"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-5 max-w-[540px] font-body text-[16px] font-light leading-[1.7]",
              isPlum ? "text-gold" : "text-text-body"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
