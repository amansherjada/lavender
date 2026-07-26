import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Pass true when this is the first element after Navbar, to clear the fixed header. */
  topPadded?: boolean;
}

export default function Breadcrumbs({ items, topPadded = false }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://lavenderuae.com${item.href}` }
        : {}),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("bg-cream", topPadded && "pt-24 md:pt-28")}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-1.5 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted md:px-12">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={11} className="text-text-muted/50" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-plum">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
