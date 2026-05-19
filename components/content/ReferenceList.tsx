import { ExternalLink } from "lucide-react";
import type { Referensi } from "@/lib/validators/tool-validator";

interface ReferenceListProps {
  referensi: Referensi[];
}

export function ReferenceList({ referensi }: ReferenceListProps) {
  if (referensi.length === 0) return null;

  return (
    <section className="space-y-2">
      <h3 className="text-base font-semibold text-gray-700">Referensi</h3>
      <ul className="space-y-1">
        {referensi.map((ref, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-0.5 text-gray-400">[{i + 1}]</span>
            <span>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
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
