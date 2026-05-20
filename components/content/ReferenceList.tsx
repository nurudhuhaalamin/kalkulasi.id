import { ExternalLink } from "lucide-react";
import type { Referensi } from "@/lib/validators/tool-validator";

export function ReferenceList({ referensi }: { referensi: Referensi[] }) {
  if (referensi.length === 0) return null;

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
        Referensi
      </h3>
      <ul className="space-y-1.5">
        {referensi.map((ref, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="mt-0.5 flex-shrink-0">[{i + 1}]</span>
            <span>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors"
                style={{ color: "var(--accent)" }}
              >
                {ref.judul}
                <ExternalLink className="h-3 w-3" />
              </a>
              {" "}— {ref.sumber}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
