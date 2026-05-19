import type { Metadata } from "next";
import { SITE } from "@/lib/constants/site";
import type { Tool } from "@/lib/validators/tool-validator";

export function generateToolMetadata(tool: Tool): Metadata {
  const title = `${tool.nama} — ${tool.namaAlternatif[0] ?? "Kalkulator Finansial"} | Kalkulasi.id`;
  const description = `${tool.ringkasan} ${tool.namaAlternatif.slice(0, 2).join(", ")} gratis dan akurat.`;
  const url = `${SITE.url}/kalkulator/${tool.kategori}/${tool.slug}`;

  return {
    title,
    description,
    keywords: [...tool.keywords, ...tool.searchKeywords].join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SITE.twitter,
    },
  };
}

export function generateKategoriMetadata(
  kategoriSlug: string,
  kategoriLabel: string,
  jumlahTools: number
): Metadata {
  const title = `Kalkulator ${kategoriLabel} — ${jumlahTools} Tools Gratis | Kalkulasi.id`;
  const description = `Temukan ${jumlahTools} kalkulator ${kategoriLabel.toLowerCase()} gratis dan akurat di Kalkulasi.id. Tools finansial terpercaya untuk masyarakat Indonesia.`;
  const url = `${SITE.url}/kalkulator/${kategoriSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
  };
}

export function generateHubMetadata(): Metadata {
  return {
    title: "Kalkulator Finansial Gratis — Semua Tools | Kalkulasi.id",
    description:
      "Koleksi kalkulator finansial gratis terlengkap untuk investor, trader, dan masyarakat Indonesia. KPR, DCA, Position Sizing, PPh 21, Dana Darurat, dan banyak lagi.",
    alternates: { canonical: `${SITE.url}/kalkulator` },
    openGraph: {
      title: "Kalkulator Finansial Gratis — Semua Tools | Kalkulasi.id",
      description:
        "Koleksi kalkulator finansial gratis terlengkap untuk investor, trader, dan masyarakat Indonesia.",
      url: `${SITE.url}/kalkulator`,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
  };
}
