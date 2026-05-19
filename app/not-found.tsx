import Link from "next/link";
import { Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 mb-6">
        <Calculator className="h-8 w-8 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
      <p className="text-xl font-medium text-gray-700 mb-2">Halaman tidak ditemukan</p>
      <p className="text-gray-500 mb-8 max-w-sm">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/kalkulator"
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Lihat Kalkulator
        </Link>
      </div>
    </div>
  );
}
