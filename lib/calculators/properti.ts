// Calculator engine: Kredit Properti & KPR

export interface KPRInput {
  hargaProperti: number;
  persenDP: number;
  sukuBungaTahunan: number;
  tenorTahun: number;
}

export interface AmortisasiRow {
  bulanKe: number;
  angsuran: number;
  pokok: number;
  bunga: number;
  sisaPinjaman: number;
}

export interface KPRResult {
  pokokPinjaman: number;
  uangMuka: number;
  angsuranBulanan: number;
  totalPembayaran: number;
  totalBunga: number;
  amortisasi: AmortisasiRow[];
}

export function hitungKPR(input: KPRInput): KPRResult {
  const { hargaProperti, persenDP, sukuBungaTahunan, tenorTahun } = input;

  const uangMuka = hargaProperti * (persenDP / 100);
  const pokokPinjaman = hargaProperti - uangMuka;
  const r = sukuBungaTahunan / 100 / 12;
  const n = tenorTahun * 12;

  const angsuranBulanan =
    r === 0
      ? pokokPinjaman / n
      : (pokokPinjaman * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  const totalPembayaran = angsuranBulanan * n;
  const totalBunga = totalPembayaran - pokokPinjaman;

  const amortisasi: AmortisasiRow[] = [];
  let sisaPinjaman = pokokPinjaman;

  for (let bulanKe = 1; bulanKe <= n; bulanKe++) {
    const bunga = sisaPinjaman * r;
    const pokok = angsuranBulanan - bunga;
    sisaPinjaman = Math.max(0, sisaPinjaman - pokok);

    amortisasi.push({
      bulanKe,
      angsuran: angsuranBulanan,
      pokok,
      bunga,
      sisaPinjaman,
    });
  }

  return {
    pokokPinjaman,
    uangMuka,
    angsuranBulanan,
    totalPembayaran,
    totalBunga,
    amortisasi,
  };
}

export interface KelayakanKPRInput {
  penghasilanBersihBulanan: number;
  totalCicilanLain: number;
  sukuBungaTahunan: number;
  tenorTahun: number;
  rasioAmanPersen: number; // default 30
}

export interface KelayakanKPRResult {
  maksimalCicilanKPR: number;
  estimasiPlafonKPR: number;
  persenCicilanTerhadapGaji: number;
  aman: boolean;
}

export function hitungKelayakanKPR(input: KelayakanKPRInput): KelayakanKPRResult {
  const { penghasilanBersihBulanan, totalCicilanLain, sukuBungaTahunan, tenorTahun, rasioAmanPersen } = input;

  const maksimalCicilanKPR =
    penghasilanBersihBulanan * (rasioAmanPersen / 100) - totalCicilanLain;

  const r = sukuBungaTahunan / 100 / 12;
  const n = tenorTahun * 12;

  const estimasiPlafonKPR =
    r === 0
      ? maksimalCicilanKPR * n
      : (maksimalCicilanKPR * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  const persenCicilanTerhadapGaji =
    totalCicilanLain > 0
      ? ((totalCicilanLain + maksimalCicilanKPR) / penghasilanBersihBulanan) * 100
      : (maksimalCicilanKPR / penghasilanBersihBulanan) * 100;

  return {
    maksimalCicilanKPR: Math.max(0, maksimalCicilanKPR),
    estimasiPlafonKPR: Math.max(0, estimasiPlafonKPR),
    persenCicilanTerhadapGaji,
    aman: maksimalCicilanKPR > 0,
  };
}
