import { SITE } from "@/lib/constants/site";
import type { Tool } from "@/lib/validators/tool-validator";
import { buildBreadcrumbSchema } from "./organization.schema";
import { KATEGORI_LABELS } from "@/lib/constants/site";

export function buildToolSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.nama,
    alternateName: tool.namaAlternatif,
    description: tool.deskripsiPanjang,
    url: `${SITE.url}/kalkulator/${tool.kategori}/${tool.slug}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    inLanguage: SITE.language,
    dateModified: tool.updatedAt,
  };
}

export function buildToolFAQSchema(tool: Tool) {
  if (!tool.faq || tool.faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.pertanyaan,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.jawaban,
      },
    })),
  };
}

export function buildToolBreadcrumbSchema(tool: Tool) {
  const kategoriLabel = KATEGORI_LABELS[tool.kategori] ?? tool.kategori;
  return buildBreadcrumbSchema([
    { name: "Beranda", url: SITE.url },
    { name: "Kalkulator", url: `${SITE.url}/kalkulator` },
    { name: kategoriLabel, url: `${SITE.url}/kalkulator/${tool.kategori}` },
    { name: tool.nama, url: `${SITE.url}/kalkulator/${tool.kategori}/${tool.slug}` },
  ]);
}
