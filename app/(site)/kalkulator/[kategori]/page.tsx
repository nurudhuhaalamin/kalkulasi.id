import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { KATEGORI_LABELS } from "@/lib/constants/site";
import { getToolsByKategori, getAllKategori } from "@/lib/content/tool-registry";
import { generateKategoriMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: Promise<{ kategori: string }>;
}

export async function generateStaticParams() {
  return getAllKategori().map((k) => ({ kategori: k }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const label = KATEGORI_LABELS[kategori];
  if (!label) return {};
  const tools = getToolsByKategori(kategori).filter((t) => t.status === "aktif");
  return generateKategoriMetadata(kategori, label, tools.length);
}

export default async function KategoriPage({ params }: Props) {
  const { kategori } = await params;
  const label = KATEGORI_LABELS[kategori];
  if (!label) notFound();

  const tools = getToolsByKategori(kategori).filter((t) => t.status === "aktif");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kalkulator", href: "/kalkulator" },
          { label: label },
        ]}
      />

      <div className="mt-6 mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Kalkulator {label}</h1>
        <p className="text-gray-600">
          {tools.length} tools untuk kebutuhan {label.toLowerCase()} kamu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/kalkulator/${tool.kategori}/${tool.slug}`}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {tool.prioritas === "tinggi" && <Badge variant="blue">Populer</Badge>}
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h2 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
              {tool.nama}
            </h2>
            <p className="text-sm text-gray-500 flex-1">{tool.ringkasan}</p>
            {tool.namaAlternatif.length > 0 && (
              <p className="mt-2 text-xs text-gray-400 truncate">
                {tool.namaAlternatif.slice(0, 2).join(" · ")}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
