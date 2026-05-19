import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tentang Kalkulasi.id — Kalkulator Finansial Gratis",
  description:
    "Kalkulasi.id adalah situs kalkulator finansial gratis untuk masyarakat Indonesia. Pelajari visi dan misi kami.",
  alternates: { canonical: `${SITE.url}/tentang` },
};

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Tentang" }]} />

      <div className="mt-6 space-y-6 prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900">Tentang Kalkulasi.id</h1>

        <p className="text-gray-700 leading-relaxed">
          Kalkulasi.id adalah situs kalkulator finansial gratis yang dibangun untuk membantu
          masyarakat Indonesia membuat keputusan keuangan yang lebih baik.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Visi</h2>
        <p className="text-gray-700">
          Menjadi library tools keuangan terpercaya dan knowledge hub finansial yang paling
          lengkap untuk Indonesia.
        </p>

        <h2 className="text-xl font-bold text-gray-900">Misi</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Menyediakan kalkulator finansial yang akurat dan mudah digunakan</li>
          <li>Mengedukasi pengguna dengan penjelasan konsep yang jelas</li>
          <li>Membantu trader, investor, dan masyarakat umum merencanakan keuangan</li>
          <li>Memberikan akses tools finansial berkualitas secara gratis</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Penafian Penting</h2>
        <p className="text-gray-700">
          Semua hasil kalkulator di Kalkulasi.id bersifat estimasi untuk tujuan edukasi dan
          perencanaan. Kalkulasi.id tidak memberikan saran investasi, saran keuangan, atau
          saran pajak profesional. Konsultasikan keputusan finansial penting dengan profesional
          yang berkualifikasi.
        </p>
      </div>
    </div>
  );
}
