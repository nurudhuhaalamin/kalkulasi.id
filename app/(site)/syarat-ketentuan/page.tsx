import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Kalkulasi.id",
  alternates: { canonical: `${SITE.url}/syarat-ketentuan` },
};

export default function SyaratKetentuanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Syarat & Ketentuan" }]} />
      <div className="mt-6 space-y-4 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900">Syarat & Ketentuan</h1>
        <p>
          Dengan menggunakan Kalkulasi.id, kamu menyetujui syarat dan ketentuan berikut.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Penggunaan yang Diperbolehkan</h2>
        <p>
          Kalkulasi.id boleh digunakan untuk keperluan edukasi, perencanaan keuangan pribadi,
          dan referensi. Dilarang menggunakan situs ini untuk tujuan komersial tanpa izin.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Keterbatasan Tanggung Jawab</h2>
        <p>
          Kalkulasi.id tidak bertanggung jawab atas keputusan finansial yang diambil
          berdasarkan hasil kalkulator. Lihat halaman{" "}
          <a href="/penafian" className="text-blue-600 hover:underline">
            Penafian
          </a>{" "}
          untuk informasi lebih lengkap.
        </p>
        <p className="text-sm text-gray-500">Terakhir diperbarui: Mei 2025</p>
      </div>
    </div>
  );
}
