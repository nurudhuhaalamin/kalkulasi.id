import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Kalkulasi.id",
  alternates: { canonical: `${SITE.url}/kebijakan-privasi` },
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kebijakan Privasi" }]} />
      <div className="mt-6 space-y-4 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900">Kebijakan Privasi</h1>
        <p>
          Kalkulasi.id menghormati privasi pengguna. Halaman ini menjelaskan bagaimana kami
          mengelola informasi pengunjung situs.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Data yang Dikumpulkan</h2>
        <p>
          Kalkulasi.id tidak mengumpulkan data pribadi seperti nama, email, atau informasi
          identitas lain kecuali kamu secara sukarela menghubungi kami. Input kalkulator
          diproses di browser kamu dan tidak dikirim ke server kami.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
        <p>
          Kami menggunakan layanan analytics untuk memahami bagaimana situs digunakan secara
          agregat dan anonim. Data ini digunakan untuk meningkatkan kualitas konten dan tools.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Cookie</h2>
        <p>
          Situs ini dapat menggunakan cookie untuk keperluan analytics. Kamu dapat mengelola
          preferensi cookie melalui pengaturan browser.
        </p>
        <p className="text-sm text-gray-500">Terakhir diperbarui: Mei 2025</p>
      </div>
    </div>
  );
}
