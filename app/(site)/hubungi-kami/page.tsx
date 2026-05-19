import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami | Kalkulasi.id",
  description: "Hubungi tim Kalkulasi.id untuk pertanyaan, masukan, atau saran.",
  alternates: { canonical: `${SITE.url}/hubungi-kami` },
};

export default function HubungiKamiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Hubungi Kami" }]} />

      <div className="mt-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Hubungi Kami</h1>
        <p className="text-gray-600">
          Ada pertanyaan, masukan, atau ingin melaporkan bug? Kami senang mendengar dari kamu.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Untuk mengajukan tool baru, gunakan halaman{" "}
          <a href="/ajukan-tool" className="text-blue-600 hover:underline">
            Ajukan Tool
          </a>
          .
        </p>
      </div>
    </div>
  );
}
