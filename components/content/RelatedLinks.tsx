import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InternalLink } from "@/lib/validators/tool-validator";

interface RelatedLinksProps {
  title?: string;
  links: InternalLink[];
}

export function RelatedLinks({ title = "Tool Terkait", links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="space-y-3">
      <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="card-hover flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-card)" }}
          >
            <span>{link.label}</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
