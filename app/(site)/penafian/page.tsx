import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Penafian | Kalkulasi.id",
  description: "Penafian dan ketentuan penggunaan kalkulator finansial Kalkulasi.id.",
  alternates: { canonical: `${SITE.url}/penafian` },
};

export default function PenafianPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Penafian" }]} />

      <div className="mt-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Penafian</h1>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Seluruh konten, tools, dan kalkulator yang tersedia di Kalkulasi.id disediakan
            semata-mata untuk tujuan <strong>informasi dan edukasi</strong>.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Bukan Saran Keuangan</h2>
          <p>
            Hasil perhitungan yang ditampilkan oleh kalkulator Kalkulasi.id adalah estimasi
            berdasarkan input yang diberikan pengguna. Hasil tersebut <strong>bukan</strong>{" "}
            merupakan saran investasi, saran keuangan, saran pajak, atau rekomendasi produk
            keuangan apapun.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Konsultasi Profesional</h2>
          <p>
            Sebelum mengambil keputusan keuangan yang signifikan — termasuk investasi, pengambilan
            kredit, perencanaan pajak, atau keputusan trading — kami sangat menyarankan untuk
            berkonsultasi dengan profesional keuangan, penasihat investasi berlisensi, atau
            konsultan pajak yang berkualifikasi.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Akurasi Informasi</h2>
          <p>
            Kami berupaya menyajikan informasi yang akurat dan terkini. Namun, peraturan
            perpajakan, kebijakan keuangan, dan kondisi pasar dapat berubah sewaktu-waktu.
            Selalu verifikasi informasi terbaru dari sumber resmi seperti OJK, BI, DJP, atau
            Bappebti.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Keterbatasan Tanggung Jawab</h2>
          <p>
            Kalkulasi.id tidak bertanggung jawab atas kerugian finansial apapun yang mungkin
            timbul dari penggunaan atau ketergantungan terhadap hasil kalkulator atau informasi
            yang tersedia di situs ini.
          </p>
        </div>
      </div>
    </div>
  );
}
