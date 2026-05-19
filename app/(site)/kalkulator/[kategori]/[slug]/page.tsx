import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getToolBySlug, getToolsByKategori } from "@/lib/content/tool-registry";
import { KATEGORI_LABELS } from "@/lib/constants/site";
import { generateToolMetadata } from "@/lib/seo/metadata";
import { buildToolSchema, buildToolFAQSchema, buildToolBreadcrumbSchema } from "@/lib/schema/tool.schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQSection } from "@/components/seo/FAQSection";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { ReferenceList } from "@/components/content/ReferenceList";
import { ContentCallout } from "@/components/content/ContentCallout";

interface Props {
  params: Promise<{ kategori: string; slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.filter((t) => t.status === "aktif").map((t) => ({
    kategori: t.kategori,
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { kategori, slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.kategori !== kategori) notFound();

  const kategoriLabel = KATEGORI_LABELS[tool.kategori] ?? tool.kategori;
  const toolsRelated = getToolsByKategori(tool.kategori)
    .filter((t) => t.slug !== tool.slug && t.status === "aktif")
    .slice(0, 4)
    .map((t) => ({ label: t.nama, href: `/kalkulator/${t.kategori}/${t.slug}` }));

  const schemaObjects = [
    buildToolSchema(tool),
    buildToolBreadcrumbSchema(tool),
    ...(buildToolFAQSchema(tool) ? [buildToolFAQSchema(tool)!] : []),
  ];

  return (
    <>
      <JsonLd schema={schemaObjects} />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Kalkulator", href: "/kalkulator" },
            { label: kategoriLabel, href: `/kalkulator/${tool.kategori}` },
            { label: tool.nama },
          ]}
        />

        {/* Hero */}
        <div className="mt-6 mb-8 space-y-3">
          <div className="text-sm font-medium text-blue-600">{kategoriLabel}</div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{tool.nama}</h1>
          {tool.namaAlternatif.length > 0 && (
            <p className="text-sm text-gray-500">
              Dikenal juga sebagai: {tool.namaAlternatif.slice(0, 3).join(", ")}
            </p>
          )}
          <p className="text-lg text-gray-600">{tool.ringkasan}</p>
        </div>

        {/* Calculator placeholder — diisi ToolClientWrapper per tool */}
        <div className="mb-10 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-500 font-medium">Kalkulator {tool.nama}</p>
          <p className="text-sm text-gray-400 mt-1">
            Form input interaktif akan ditampilkan di sini.
          </p>
        </div>

        {/* Deskripsi */}
        <section className="mb-10 space-y-4">
          <p className="text-gray-700 leading-relaxed">{tool.deskripsiPanjang}</p>
        </section>

        {/* Cara Pakai */}
        {tool.caraPakai.length > 0 && (
          <section className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Cara Menggunakan</h2>
            <ol className="space-y-3">
              {tool.caraPakai.map((langkah, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{langkah}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Formula */}
        {tool.formula && (
          <section className="mb-10 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Formula</h2>
            <div className="rounded-xl bg-gray-900 px-5 py-4">
              <code className="font-mono text-sm text-green-400">{tool.formula}</code>
            </div>
            {tool.variableDefinitions && Object.keys(tool.variableDefinitions).length > 0 && (
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Variabel</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Definisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(tool.variableDefinitions).map(([varName, definisi]) => (
                      <tr key={varName}>
                        <td className="px-4 py-2 font-mono font-medium text-blue-600">{varName}</td>
                        <td className="px-4 py-2 text-gray-600">{definisi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Contoh */}
        {tool.contoh && (
          <section className="mb-10 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Contoh Perhitungan</h2>
            <ContentCallout type="info">{tool.contoh}</ContentCallout>
          </section>
        )}

        {/* Batasan */}
        {tool.batasan.length > 0 && (
          <section className="mb-10 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Catatan & Batasan Asumsi</h2>
            <ContentCallout type="warning">
              <ul className="space-y-1.5 list-disc list-inside">
                {tool.batasan.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </ContentCallout>
          </section>
        )}

        {/* FAQ */}
        {tool.faq.length > 0 && (
          <div className="mb-10">
            <FAQSection faqs={tool.faq} />
          </div>
        )}

        {/* Related Tools & Internal Links */}
        <div className="mb-10 space-y-6">
          {tool.internalLinks.length > 0 && (
            <RelatedLinks title="Tool Terkait" links={tool.internalLinks} />
          )}
          {toolsRelated.length > 0 && (
            <RelatedLinks title={`Kalkulator ${kategoriLabel} Lainnya`} links={toolsRelated} />
          )}
        </div>

        {/* Referensi */}
        {tool.referensi.length > 0 && (
          <div className="mb-8">
            <ReferenceList referensi={tool.referensi} />
          </div>
        )}

        {/* Trust / Disclaimer */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 px-5 py-4 text-xs text-gray-500 space-y-1">
          <p>
            <strong>Penafian:</strong> Hasil kalkulator ini bersifat estimasi untuk tujuan
            edukasi dan perencanaan. Bukan merupakan saran investasi atau keuangan profesional.
          </p>
          <p>Terakhir diperbarui: {tool.updatedAt}</p>
        </div>
      </div>
    </>
  );
}
