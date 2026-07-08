import { cn } from "@/lib/utils";

interface SectionLabelProps {
  text: string;
  centered?: boolean;
  className?: string;
}

export default function SectionLabel({
  text,
  centered = false,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center gap-3",
        centered && "justify-center",
        className
      )}
    >
      <div className="h-px w-7 bg-gold" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
        {text}
      </span>
      {centered && <div className="h-px w-7 bg-gold" />}
    </div>
  );
}
