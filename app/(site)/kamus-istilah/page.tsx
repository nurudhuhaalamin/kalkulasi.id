import type { Metadata } from "next";
import { KAMUS } from "@/lib/content/kamus-istilah-registry";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Kamus Istilah Finansial — Bilingual Indonesia & Inggris | Kalkulasi.id",
  description:
    "Kamus istilah keuangan, investasi, dan trading dalam bahasa Indonesia dan Inggris. Penjelasan mudah untuk DCA, Position Sizing, Stop Loss, KPR, PPh 21, dan banyak lagi.",
  alternates: { canonical: `${SITE.url}/kamus-istilah` },
};

const statusLabel = {
  inggris: { label: "Inggris", variant: "blue" as const },
  indonesia: { label: "Indonesia", variant: "green" as const },
  hybrid: { label: "Hybrid", variant: "amber" as const },
};

const kategoriLabel: Record<string, string> = {
  trading: "Trading",
  investasi: "Investasi",
  "keuangan-pribadi": "Keuangan Pribadi",
  properti: "Properti & KPR",
  perpajakan: "Perpajakan",
};

export default function KamusIstilahPage() {
  const kategori = [...new Set(KAMUS.map((k) => k.kategori))];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kamus Istilah" }]} />

      <div className="mt-6 mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Kamus Istilah Finansial</h1>
        <p className="text-gray-600">
          Definisi istilah keuangan, investasi, dan trading dalam konteks Indonesia — lengkap
          dengan keputusan bilingual resmi.
        </p>
      </div>

      <div className="mb-6 flex gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <Badge variant="blue">Inggris</Badge>
          Gunakan istilah Inggris
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="green">Indonesia</Badge>
          Gunakan istilah Indonesia
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="amber">Hybrid</Badge>
          Boleh keduanya
        </span>
      </div>

      {kategori.map((kat) => {
        const istilah = KAMUS.filter((k) => k.kategori === kat);
        return (
          <section key={kat} className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              {kategoriLabel[kat] ?? kat}
            </h2>
            <div className="space-y-4">
              {istilah.map((item) => (
                <div key={item.istilah} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.istilah}</h3>
                    <Badge variant={statusLabel[item.status].variant}>
                      {statusLabel[item.status].label}
                    </Badge>
                  </div>
                  {item.padananIndonesia && (
                    <p className="text-xs text-gray-500 mb-2">
                      Padanan Indonesia: <em>{item.padananIndonesia}</em>
                    </p>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">{item.definisi}</p>
                  <p className="mt-2 text-xs text-gray-500 italic">{item.contohPenggunaan}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
