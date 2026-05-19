import { z } from "zod";
import { FAQSchema, ReferensiSchema, LinkSchema } from "./tool-validator";

export const ArtikelSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug harus kebab-case"),
  kategori: z.string(),
  judul: z.string(),
  ringkasan: z.string(),
  intro: z.string(),
  relatedTools: z.array(LinkSchema),
  relatedArticles: z.array(LinkSchema),
  faq: z.array(FAQSchema),
  referensi: z.array(ReferensiSchema),
  tags: z.array(z.string()),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  reviewedAt: z.string().optional(),
  status: z.enum(["aktif", "draft", "tidak-aktif"]),
});

export type Artikel = z.infer<typeof ArtikelSchema>;
