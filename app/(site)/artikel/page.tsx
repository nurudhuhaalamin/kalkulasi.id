import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Artikel Finansial — Panduan Investasi & Keuangan | Kalkulasi.id",
  description:
    "Artikel panduan keuangan, investasi, trading, dan perpajakan untuk masyarakat Indonesia. Ditulis dengan penjelasan yang mudah dipahami.",
  alternates: { canonical: `${SITE.url}/artikel` },
};

export default function ArtikelHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Artikel" }]} />

      <div className="mt-6 mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Artikel Finansial</h1>
        <p className="text-gray-600">
          Panduan, tips, dan penjelasan mendalam tentang keuangan, investasi, trading, dan
          perpajakan untuk masyarakat Indonesia.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
        <p className="text-gray-500 font-medium">Artikel sedang dalam persiapan</p>
        <p className="text-sm text-gray-400 mt-1">
          Tim konten sedang menyiapkan artikel berkualitas tinggi untuk kamu.
        </p>
      </div>
    </div>
  );
}
