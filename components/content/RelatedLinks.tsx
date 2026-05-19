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
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            <span>{link.label}</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
