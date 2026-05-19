import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Ajukan Tool Baru | Kalkulasi.id",
  description: "Punya ide kalkulator finansial yang belum ada? Ajukan ke tim Kalkulasi.id.",
  alternates: { canonical: `${SITE.url}/ajukan-tool` },
};

export default function AjukanToolPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Ajukan Tool" }]} />

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Lightbulb className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ajukan Tool Baru</h1>
        </div>

        <p className="text-gray-600">
          Punya ide kalkulator finansial yang belum ada di Kalkulasi.id? Kami terbuka untuk
          usulan dari komunitas.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Kriteria tool yang kami pertimbangkan:</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">·</span>
              Ada kebutuhan nyata dari pengguna Indonesia
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">·</span>
              Berkaitan dengan keuangan, investasi, trading, atau perpajakan
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">·</span>
              Belum tersedia atau belum lengkap di Kalkulasi.id
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">·</span>
              Punya formula atau metode yang jelas dan bisa diverifikasi
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-600">
          Kirimkan ide kamu ke:{" "}
          <a href={`mailto:${SITE.email}`} className="text-blue-600 hover:underline font-medium">
            {SITE.email}
          </a>
        </p>
      </div>
    </div>
  );
}
