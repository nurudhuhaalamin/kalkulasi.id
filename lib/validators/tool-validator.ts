import { z } from "zod";

export const FAQSchema = z.object({
  pertanyaan: z.string(),
  jawaban: z.string(),
});

export const ReferensiSchema = z.object({
  judul: z.string(),
  url: z.string().url(),
  sumber: z.string(),
});

export const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const ToolSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug harus kebab-case"),
  nama: z.string(),
  namaAlternatif: z.array(z.string()),
  kategori: z.string(),
  ringkasan: z.string(),
  deskripsiPanjang: z.string(),
  intent: z.string(),
  keywords: z.array(z.string()),
  searchKeywords: z.array(z.string()),
  formula: z.string().optional(),
  variableDefinitions: z.record(z.string(), z.string()).optional(),
  caraPakai: z.array(z.string()),
  contoh: z.string(),
  batasan: z.array(z.string()),
  faq: z.array(FAQSchema),
  referensi: z.array(ReferensiSchema),
  internalLinks: z.array(LinkSchema),
  outboundLinks: z.array(LinkSchema),
  schemaTypes: z.array(z.string()),
  updatedAt: z.string(),
  reviewedAt: z.string().optional(),
  status: z.enum(["aktif", "draft", "tidak-aktif"]),
  prioritas: z.enum(["tinggi", "sedang", "rendah"]),
});

export type Tool = z.infer<typeof ToolSchema>;
export type FAQ = z.infer<typeof FAQSchema>;
export type Referensi = z.infer<typeof ReferensiSchema>;
export type InternalLink = z.infer<typeof LinkSchema>;
