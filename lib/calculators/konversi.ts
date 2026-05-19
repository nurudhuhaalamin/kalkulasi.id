// Calculator engine: Konversi & Simulasi Finansial

// ─── Persentase ───────────────────────────────────────────────────────────────

export type TipePersentase =
  | "persen-dari" // X% dari Y = ?
  | "berapa-persen" // X adalah berapa % dari Y?
  | "perubahan" // % perubahan dari X ke Y
  | "tambah-persen" // Y + X% = ?
  | "kurang-persen"; // Y - X% = ?

export interface PersentaseInput {
  tipe: TipePersentase;
  angka1: number;
  angka2: number;
}

export interface PersentaseResult {
  hasil: number;
  penjelasan: string;
}

export function hitungPersentase(input: PersentaseInput): PersentaseResult {
  const { tipe, angka1, angka2 } = input;

  switch (tipe) {
    case "persen-dari": {
      const hasil = (angka1 / 100) * angka2;
      return {
        hasil,
        penjelasan: `${angka1}% dari ${angka2.toLocaleString("id-ID")} = ${hasil.toLocaleString("id-ID")}`,
      };
    }
    case "berapa-persen": {
      const hasil = (angka1 / angka2) * 100;
      return {
        hasil,
        penjelasan: `${angka1.toLocaleString("id-ID")} adalah ${hasil.toFixed(2)}% dari ${angka2.toLocaleString("id-ID")}`,
      };
    }
    case "perubahan": {
      const hasil = ((angka2 - angka1) / angka1) * 100;
      const arah = hasil >= 0 ? "naik" : "turun";
      return {
        hasil,
        penjelasan: `Dari ${angka1.toLocaleString("id-ID")} ke ${angka2.toLocaleString("id-ID")} → ${arah} ${Math.abs(hasil).toFixed(2)}%`,
      };
    }
    case "tambah-persen": {
      const hasil = angka2 * (1 + angka1 / 100);
      return {
        hasil,
        penjelasan: `${angka2.toLocaleString("id-ID")} + ${angka1}% = ${hasil.toLocaleString("id-ID")}`,
      };
    }
    case "kurang-persen": {
      const hasil = angka2 * (1 - angka1 / 100);
      return {
        hasil,
        penjelasan: `${angka2.toLocaleString("id-ID")} - ${angka1}% = ${hasil.toLocaleString("id-ID")}`,
      };
    }
    default:
      return { hasil: 0, penjelasan: "Tipe perhitungan tidak valid" };
  }
}

// ─── Inflasi ─────────────────────────────────────────────────────────────────

export interface InflasiInput {
  nilaiSaatIni: number;
  inflasiTahunanPersen: number;
  lamaWaktuTahun: number;
}

export interface InflasiResult {
  nilaiRiilMasaDepan: number; // daya beli masa depan
  nilaiNominalYangDibutuhkan: number; // nominal yang dibutuhkan agar sama daya beli
  penurunanDayaBeli: number; // dalam persen
  perbandinganPerTahun: { tahun: number; nilaiRiil: number }[];
}

export function hitungInflasi(input: InflasiInput): InflasiResult {
  const { nilaiSaatIni, inflasiTahunanPersen, lamaWaktuTahun } = input;

  const r = inflasiTahunanPersen / 100;
  const nilaiRiilMasaDepan = nilaiSaatIni / Math.pow(1 + r, lamaWaktuTahun);
  const nilaiNominalYangDibutuhkan = nilaiSaatIni * Math.pow(1 + r, lamaWaktuTahun);
  const penurunanDayaBeli = ((nilaiSaatIni - nilaiRiilMasaDepan) / nilaiSaatIni) * 100;

  const perbandinganPerTahun = Array.from({ length: lamaWaktuTahun + 1 }, (_, i) => ({
    tahun: i,
    nilaiRiil: nilaiSaatIni / Math.pow(1 + r, i),
  }));

  return {
    nilaiRiilMasaDepan,
    nilaiNominalYangDibutuhkan,
    penurunanDayaBeli,
    perbandinganPerTahun,
  };
}

// ─── Amortisasi Pinjaman Umum ─────────────────────────────────────────────────

export interface PinjamanInput {
  pokokPinjaman: number;
  sukuBungaTahunan: number;
  tenorBulan: number;
  jenisbunga: "efektif" | "flat";
}

export interface PinjamanBulan {
  bulanKe: number;
  angsuran: number;
  pokok: number;
  bunga: number;
  sisaPinjaman: number;
}

export interface PinjamanResult {
  angsuranBulanan: number;
  totalPembayaran: number;
  totalBunga: number;
  jadwal: PinjamanBulan[];
}

export function hitungPinjaman(input: PinjamanInput): PinjamanResult {
  const { pokokPinjaman, sukuBungaTahunan, tenorBulan, jenisbunga } = input;

  if (jenisbunga === "flat") {
    const bungaBulanan = (pokokPinjaman * sukuBungaTahunan) / 100 / 12;
    const pokokBulanan = pokokPinjaman / tenorBulan;
    const angsuranBulanan = pokokBulanan + bungaBulanan;
    const totalPembayaran = angsuranBulanan * tenorBulan;
    const totalBunga = bungaBulanan * tenorBulan;

    const jadwal: PinjamanBulan[] = Array.from({ length: tenorBulan }, (_, i) => ({
      bulanKe: i + 1,
      angsuran: angsuranBulanan,
      pokok: pokokBulanan,
      bunga: bungaBulanan,
      sisaPinjaman: pokokPinjaman - pokokBulanan * (i + 1),
    }));

    return { angsuranBulanan, totalPembayaran, totalBunga, jadwal };
  }

  // Bunga efektif (anuitas)
  const r = sukuBungaTahunan / 100 / 12;
  const angsuranBulanan =
    r === 0
      ? pokokPinjaman / tenorBulan
      : (pokokPinjaman * r * Math.pow(1 + r, tenorBulan)) / (Math.pow(1 + r, tenorBulan) - 1);

  const totalPembayaran = angsuranBulanan * tenorBulan;
  const totalBunga = totalPembayaran - pokokPinjaman;

  let sisaPinjaman = pokokPinjaman;
  const jadwal: PinjamanBulan[] = [];

  for (let i = 1; i <= tenorBulan; i++) {
    const bunga = sisaPinjaman * r;
    const pokok = angsuranBulanan - bunga;
    sisaPinjaman = Math.max(0, sisaPinjaman - pokok);

    jadwal.push({ bulanKe: i, angsuran: angsuranBulanan, pokok, bunga, sisaPinjaman });
  }

  return { angsuranBulanan, totalPembayaran, totalBunga, jadwal };
}
