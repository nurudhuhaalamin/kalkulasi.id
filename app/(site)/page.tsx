import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Zap,
  Shield,
  BookOpen,
  Lock,
  TrendingUp,
  Home,
  PiggyBank,
  BarChart2,
  Calculator,
  Receipt,
  RefreshCw,
} from "lucide-react";
import { SITE, KATEGORI_LABELS } from "@/lib/constants/site";
import { getToolsByPrioritas } from "@/lib/content/tool-registry";

export const metadata: Metadata = {
  title: `${SITE.name} — Kalkulator Finansial Gratis untuk Indonesia`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

const KATEGORI_ICONS: Record<string, React.ElementType> = {
  "kredit-properti-kpr": Home,
  "investasi-portofolio": TrendingUp,
  "trading-saham-kripto": BarChart2,
  "keuangan-pribadi": PiggyBank,
  perpajakan: Receipt,
  "pinjaman-cicilan": Calculator,
  "konversi-simulasi": RefreshCw,
};

const FITUR = [
  {
    icon: Zap,
    judul: "Real-time",
    deskripsi: "Ubah angka, lihat hasil seketika tanpa reload.",
  },
  {
    icon: Lock,
    judul: "0 Data Disimpan",
    deskripsi: "Berjalan di browser. Data tidak dikirim ke server.",
  },
  {
    icon: BookOpen,
    judul: "Edukatif & Lengkap",
    deskripsi: "Setiap tool dengan formula, contoh, dan FAQ.",
  },
  {
    icon: Shield,
    judul: "100% Gratis",
    deskripsi: "Tanpa akun, tanpa langganan, tanpa iklan.",
  },
];

const STATS = [
  { value: "32+", label: "Kalkulator" },
  { value: "7", label: "Kategori" },
  { value: "100%", label: "Gratis" },
  { value: "0", label: "Data Disimpan" },
];

export default function HomePage() {
  const toolsPrioritas = getToolsByPrioritas("tinggi").slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative px-4 pt-16 pb-12 text-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* dot grid bg */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            opacity: 0.5,
          }}
        />

        <div className="relative mx-auto max-w-3xl space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              backgroundColor: "var(--accent-dim)",
            }}
          >
            <Zap className="h-3.5 w-3.5" />
            32 Tools Gratis · Tanpa Akun
          </div>

          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Kalkulator Finansial &{" "}
            <span style={{ color: "var(--accent)" }}>Investasi</span>
            <br />
            untuk Indonesia
          </h1>

          <p
            className="mx-auto max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Semua kalkulasi berbasis logika dan matematika. Input data kamu, dapatkan hasil
            instan — tanpa akun, tanpa langganan.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kalkulator"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Lihat Semua Tools
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/kalkulator/perpajakan/kalkulator-pph-21"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-base font-semibold transition-opacity hover:opacity-80"
              style={{
                borderColor: "var(--border-hover)",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              Hitung PPh 21
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-14 mx-auto max-w-2xl grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-3xl font-bold tabular-nums"
                style={{ color: "var(--accent)" }}
              >
                {s.value}
              </p>
              <p className="mt-0.5 text-sm" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature bar */}
      <div
        className="border-y py-3"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-2 px-4">
          {[
            "Real-time — ubah angka, hasil langsung berubah",
            "Berjalan di browser — data tidak dikirim ke server",
            "Formula terverifikasi dengan referensi akademis",
          ].map((text) => (
            <span
              key={text}
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <Zap className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Tools Populer */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Tools Paling Populer
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              Kalkulator yang paling sering digunakan
            </p>
          </div>
          <Link
            href="/kalkulator"
            className="link-hover hidden items-center gap-1 text-sm font-medium sm:flex"
            style={{ color: "var(--accent)" }}
          >
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolsPrioritas.map((tool) => (
            <Link
              key={tool.id}
              href={`/kalkulator/${tool.kategori}/${tool.slug}`}
              className="card-hover group rounded-xl border p-5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="mb-1 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--orange)" }}
              >
                {KATEGORI_LABELS[tool.kategori]}
              </div>
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {tool.nama}
              </h3>
              <p
                className="mt-1.5 text-sm line-clamp-2"
                style={{ color: "var(--text-muted)" }}
              >
                {tool.ringkasan}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/kalkulator"
            className="link-hover inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Lihat semua kalkulator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Kategori */}
      <section className="py-16 px-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Pilih Kategori
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(KATEGORI_LABELS).map(([slug, label]) => {
              const Icon = KATEGORI_ICONS[slug] ?? Calculator;
              return (
                <Link
                  key={slug}
                  href={`/kalkulator/${slug}`}
                  className="card-hover group flex items-center gap-3 rounded-xl border p-4"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "var(--accent-dim)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  </div>
                  <span
                    className="flex-1 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {label}
                  </span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2
          className="mb-10 text-center text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Kenapa Kalkulasi.id?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FITUR.map((f) => (
            <div
              key={f.judul}
              className="rounded-xl border p-6 text-center"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--accent-dim)" }}
              >
                <f.icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {f.judul}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {f.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
          Semua hasil kalkulator bersifat estimasi untuk tujuan edukasi dan perencanaan.
          Bukan merupakan saran investasi atau keuangan profesional.{" "}
          <Link href="/penafian" className="link-hover underline">
            Baca penafian lengkap
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
