import type { MetadataRoute } from "next";
import { SITE, KATEGORI_LABELS } from "@/lib/constants/site";
import { TOOLS } from "@/lib/content/tool-registry";

const BASE = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/kalkulator`, lastModified: new Date(), priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/artikel`, lastModified: new Date(), priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/kamus-istilah`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/tentang`, lastModified: new Date(), priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/hubungi-kami`, lastModified: new Date(), priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/ajukan-tool`, lastModified: new Date(), priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/penafian`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/kebijakan-privasi`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/syarat-ketentuan`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/kebijakan-cookie`, lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
  ];

  const kategoriPages: MetadataRoute.Sitemap = Object.keys(KATEGORI_LABELS).map((slug) => ({
    url: `${BASE}/kalkulator/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOLS.filter((t) => t.status === "aktif").map((tool) => ({
    url: `${BASE}/kalkulator/${tool.kategori}/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    priority: tool.prioritas === "tinggi" ? 0.9 : 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...kategoriPages, ...toolPages];
}
