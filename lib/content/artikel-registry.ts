import type { Artikel } from "@/lib/validators/article-validator";

// Registry artikel — diisi oleh tim konten
export const ARTIKEL: Artikel[] = [];

export function getArtikelBySlug(slug: string): Artikel | undefined {
  return ARTIKEL.find((a) => a.slug === slug);
}

export function getArtikelByKategori(kategori: string): Artikel[] {
  return ARTIKEL.filter((a) => a.kategori === kategori);
}

export function getActiveArtikel(): Artikel[] {
  return ARTIKEL.filter((a) => a.status === "aktif");
}
