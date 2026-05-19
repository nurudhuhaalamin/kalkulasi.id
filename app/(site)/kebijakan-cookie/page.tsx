import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kebijakan Cookie | Kalkulasi.id",
  alternates: { canonical: `${SITE.url}/kebijakan-cookie` },
};

export default function KebijakanCookiePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kebijakan Cookie" }]} />
      <div className="mt-6 space-y-4 text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900">Kebijakan Cookie</h1>
        <p>
          Kalkulasi.id menggunakan cookie untuk meningkatkan pengalaman pengguna dan memahami
          bagaimana situs digunakan.
        </p>
        <h2 className="text-xl font-bold text-gray-900">Jenis Cookie</h2>
        <ul className="space-y-2">
          <li>
            <strong>Cookie Esensial:</strong> Diperlukan untuk fungsi dasar situs.
          </li>
          <li>
            <strong>Cookie Analytics:</strong> Membantu kami memahami penggunaan situs secara
            anonim.
          </li>
        </ul>
        <h2 className="text-xl font-bold text-gray-900">Mengelola Cookie</h2>
        <p>
          Kamu dapat mengatur atau menonaktifkan cookie melalui pengaturan browser. Menonaktifkan
          cookie dapat memengaruhi beberapa fungsi situs.
        </p>
        <p className="text-sm text-gray-500">Terakhir diperbarui: Mei 2025</p>
      </div>
    </div>
  );
}
