export const ROUTES = {
  home: "/",
  kalkulator: "/kalkulator",
  artikel: "/artikel",
  kamisIstilah: "/kamus-istilah",
  tentang: "/tentang",
  hubungiKami: "/hubungi-kami",
  ajukanTool: "/ajukan-tool",
  kebijakanPrivasi: "/kebijakan-privasi",
  syaratKetentuan: "/syarat-ketentuan",
  penafian: "/penafian",
  kebijakanCookie: "/kebijakan-cookie",
} as const;

export const KATEGORI_ROUTES = {
  "kredit-properti-kpr": "/kalkulator/kredit-properti-kpr",
  "investasi-portofolio": "/kalkulator/investasi-portofolio",
  "trading-saham-kripto": "/kalkulator/trading-saham-kripto",
  "keuangan-pribadi": "/kalkulator/keuangan-pribadi",
  perpajakan: "/kalkulator/perpajakan",
  "pinjaman-cicilan": "/kalkulator/pinjaman-cicilan",
  "konversi-simulasi": "/kalkulator/konversi-simulasi",
} as const;

export function toolRoute(kategori: string, slug: string): string {
  return `/kalkulator/${kategori}/${slug}`;
}

export function artikelRoute(kategori: string, slug: string): string {
  return `/artikel/${kategori}/${slug}`;
}
