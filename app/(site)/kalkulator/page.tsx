import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { KATEGORI_LABELS } from "@/lib/constants/site";
import { TOOLS, getToolsByKategori } from "@/lib/content/tool-registry";
import { generateHubMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = generateHubMetadata();

export default function KalkulatorHubPage() {
  const totalTools = TOOLS.filter((t) => t.status === "aktif").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kalkulator" }]} />

      <div className="mt-6 mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Kalkulator Finansial</h1>
        <p className="text-gray-600">
          {totalTools} kalkulator gratis untuk membantu perencanaan keuangan, investasi, dan
          trading kamu.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(KATEGORI_LABELS).map(([slug, label]) => {
          const tools = getToolsByKategori(slug).filter((t) => t.status === "aktif");
          if (tools.length === 0) return null;

          return (
            <section key={slug}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{label}</h2>
                <Link
                  href={`/kalkulator/${slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Lihat semua <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tools.slice(0, 6).map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/kalkulator/${tool.kategori}/${tool.slug}`}
                    className="group flex items-start justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {tool.nama}
                        </h3>
                        {tool.prioritas === "tinggi" && (
                          <Badge variant="blue">Populer</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{tool.ringkasan}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
