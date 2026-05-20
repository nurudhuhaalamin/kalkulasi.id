import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
          )}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="link-hover transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="font-medium"
              aria-current="page"
              style={{ color: "var(--accent)" }}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
