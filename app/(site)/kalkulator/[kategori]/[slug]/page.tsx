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
import { ToolClientWrapper } from "./ToolClientWrapper";

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

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
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
        <div className="mt-6 mb-8 space-y-2">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: "var(--orange-dim)", color: "var(--orange)" }}
          >
            {kategoriLabel}
          </span>
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            {tool.nama}
          </h1>
          {tool.namaAlternatif.length > 0 && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Dikenal juga sebagai: {tool.namaAlternatif.slice(0, 3).join(", ")}
            </p>
          )}
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {tool.ringkasan}
          </p>
        </div>

        {/* ─── Calculator ─── */}
        <div className="mb-12">
          <ToolClientWrapper tool={tool} />
        </div>

        {/* Deskripsi */}
        <section className="mb-12">
          <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {tool.deskripsiPanjang}
          </p>
        </section>

        {/* Cara Menggunakan — numbered cards */}
        {tool.caraPakai.length > 0 && (
          <section className="mb-12 space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Cara Menggunakan {tool.nama}
            </h2>
            <div className="space-y-3">
              {tool.caraPakai.map((langkah, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border p-4"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--orange)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {langkah}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rumus & Logika */}
        {tool.formula && (
          <section className="mb-12 space-y-4">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Rumus &amp; Logika
            </h2>
            <div className="rounded-xl p-5" style={{ backgroundColor: "#0f172a" }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#64748b" }}>
                Formula
              </p>
              <code
                className="block whitespace-pre-wrap font-mono text-sm leading-relaxed"
                style={{ color: "#10b981" }}
              >
                {tool.formula}
              </code>
            </div>

            {tool.variableDefinitions && Object.keys(tool.variableDefinitions).length > 0 && (
              <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(tool.variableDefinitions).map(([varName, definisi]) => (
                      <tr key={varName} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td
                          className="w-1/3 px-4 py-3 font-mono font-semibold"
                          style={{ color: "var(--orange)", backgroundColor: "var(--bg-secondary)" }}
                        >
                          {varName}
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                          {definisi}
                        </td>
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
          <section className="mb-12 space-y-3">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Contoh Perhitungan
            </h2>
            <div
              className="rounded-xl border-l-4 p-5"
              style={{
                borderLeftColor: "var(--blue)",
                backgroundColor: "var(--bg-secondary)",
                borderTop: "1px solid var(--border)",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tool.contoh}
              </p>
            </div>
          </section>
        )}

        {/* Batasan */}
        {tool.batasan.length > 0 && (
          <section className="mb-12 space-y-3">
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Catatan &amp; Batasan Asumsi
            </h2>
            <div
              className="rounded-xl border-l-4 p-5"
              style={{
                borderLeftColor: "var(--amber)",
                backgroundColor: "var(--bg-secondary)",
                borderTop: "1px solid var(--border)",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <ul className="space-y-1.5">
                {tool.batasan.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-0.5 font-bold" style={{ color: "var(--amber)" }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ */}
        {tool.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Pertanyaan Umum
            </h2>
            <FAQSection faqs={tool.faq} />
          </section>
        )}

        {/* Related Tools */}
        <div className="mb-12 space-y-6">
          {tool.internalLinks.length > 0 && (
            <RelatedLinks title="Tool Terkait" links={tool.internalLinks} />
          )}
          {toolsRelated.length > 0 && (
            <RelatedLinks title={`Kalkulator ${kategoriLabel} Lainnya`} links={toolsRelated} />
          )}
        </div>

        {/* Referensi */}
        {tool.referensi.length > 0 && (
          <div className="mb-10">
            <ReferenceList referensi={tool.referensi} />
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="rounded-xl border p-4 text-xs space-y-1"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>
            <strong style={{ color: "var(--text-secondary)" }}>Penafian:</strong> Hasil kalkulator
            bersifat estimasi untuk tujuan edukasi dan perencanaan. Bukan merupakan saran
            investasi atau keuangan profesional.
          </p>
          <p>Terakhir diperbarui: {tool.updatedAt}</p>
        </div>
      </div>
    </>
  );
}
