import Link from "next/link";
import type { Metadata } from "next";
import { Calculator, TrendingUp, Shield, BookOpen, ArrowRight } from "lucide-react";
import { SITE, KATEGORI_LABELS } from "@/lib/constants/site";
import { getToolsByPrioritas } from "@/lib/content/tool-registry";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: `${SITE.name} — Kalkulator Finansial Gratis untuk Indonesia`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

const FITUR = [
  {
    icon: Calculator,
    judul: "Tools Interaktif",
    deskripsi: "Kalkulator yang mudah digunakan, langsung tampilkan hasil yang akurat.",
  },
  {
    icon: BookOpen,
    judul: "Edukatif & Lengkap",
    deskripsi: "Setiap tool disertai penjelasan konsep, formula, dan contoh nyata.",
  },
  {
    icon: TrendingUp,
    judul: "Untuk Investor & Trader",
    deskripsi: "Tools khusus untuk analisis investasi, manajemen risiko, dan perencanaan portofolio.",
  },
  {
    icon: Shield,
    judul: "Gratis Selamanya",
    deskripsi: "Semua kalkulator gratis tanpa biaya, tanpa syarat tersembunyi.",
  },
];

export default function HomePage() {
  const toolsPrioritas = getToolsByPrioritas("tinggi").slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <Badge variant="blue">Gratis untuk Semua</Badge>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Kalkulator Finansial
            <br />
            <span className="text-blue-600">Terpercaya untuk Indonesia</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tools keuangan gratis untuk investor, trader, dan masyarakat Indonesia. KPR, DCA,
            Position Sizing, Pajak, dan lebih dari 30 kalkulator lainnya — dengan penjelasan
            yang mudah dipahami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/kalkulator"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Lihat Semua Kalkulator
            </Link>
            <Link
              href="/kamus-istilah"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Kamus Istilah
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Prioritas */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tools Paling Populer</h2>
            <p className="mt-1 text-gray-600">Kalkulator yang paling sering digunakan</p>
          </div>
          <Link
            href="/kalkulator"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolsPrioritas.map((tool) => (
            <Link
              key={tool.id}
              href={`/kalkulator/${tool.kategori}/${tool.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="mb-2 text-xs font-medium text-blue-600">
                {KATEGORI_LABELS[tool.kategori]}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {tool.nama}
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{tool.ringkasan}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/kalkulator"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            Lihat semua kalkulator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Kategori */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Jelajahi per Kategori</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(KATEGORI_LABELS).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/kalkulator/${slug}`}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3.5 font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                <span>{label}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Kenapa Kalkulasi.id?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FITUR.map((fitur) => (
            <div key={fitur.judul} className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <fitur.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{fitur.judul}</h3>
              <p className="text-sm text-gray-600">{fitur.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray-400">
          Semua hasil kalkulator bersifat estimasi untuk tujuan edukasi dan perencanaan.
          Bukan merupakan saran investasi atau keuangan profesional.{" "}
          <Link href="/penafian" className="underline">
            Baca penafian lengkap
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
