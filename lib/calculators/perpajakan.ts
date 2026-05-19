// Calculator engine: Perpajakan

// ─── PPh 21 ───────────────────────────────────────────────────────────────────

export type StatusPTKP = "TK/0" | "TK/1" | "TK/2" | "TK/3" | "K/0" | "K/1" | "K/2" | "K/3";

// PTKP sesuai PMK terbaru (dalam rupiah per tahun)
const PTKP_TAHUNAN: Record<StatusPTKP, number> = {
  "TK/0": 54_000_000,
  "TK/1": 58_500_000,
  "TK/2": 63_000_000,
  "TK/3": 67_500_000,
  "K/0": 58_500_000,
  "K/1": 63_000_000,
  "K/2": 67_500_000,
  "K/3": 72_000_000,
};

// Tarif progresif PPh Pasal 17
const LAPISAN_TARIF = [
  { batas: 60_000_000, tarif: 0.05 },
  { batas: 250_000_000, tarif: 0.15 },
  { batas: 500_000_000, tarif: 0.25 },
  { batas: 5_000_000_000, tarif: 0.30 },
  { batas: Infinity, tarif: 0.35 },
];

export interface PPh21Input {
  gajiBrutoPerBulan: number;
  statusPTKP: StatusPTKP;
  biayaJabatanPersen: number; // default 5%, max 500rb/bln
  iuranBPJSKesehatanKaryawan: number;
  iuranBPJSTenagaKerjaBulanan: number;
}

export interface LapisanPajak {
  lapisan: string;
  pkpLapisan: number;
  tarif: number;
  pajak: number;
}

export interface PPh21Result {
  gajiBrutoTahunan: number;
  biayaJabatanTahunan: number;
  iuranPensiunTahunan: number;
  penghasilanNetoBruto: number;
  ptkp: number;
  pkp: number;
  pphTerutangTahunan: number;
  pphTerutangBulanan: number;
  takeHomePay: number;
  lapisanPajak: LapisanPajak[];
}

function hitungPajakProgresif(pkp: number): { total: number; lapisan: LapisanPajak[] } {
  let sisa = pkp;
  let total = 0;
  let batasBawah = 0;
  const lapisan: LapisanPajak[] = [];

  for (const { batas, tarif } of LAPISAN_TARIF) {
    if (sisa <= 0) break;
    const rentang = batas - batasBawah;
    const kena = Math.min(sisa, rentang);
    const pajak = kena * tarif;
    total += pajak;
    lapisan.push({
      lapisan: batasBawah === 0 ? `s.d. Rp ${batas.toLocaleString("id-ID")}` : `Rp ${batasBawah.toLocaleString("id-ID")} - Rp ${batas === Infinity ? "∞" : batas.toLocaleString("id-ID")}`,
      pkpLapisan: kena,
      tarif: tarif * 100,
      pajak,
    });
    sisa -= kena;
    batasBawah = batas;
  }

  return { total, lapisan };
}

export function hitungPPh21(input: PPh21Input): PPh21Result {
  const {
    gajiBrutoPerBulan,
    statusPTKP,
    biayaJabatanPersen,
    iuranBPJSKesehatanKaryawan,
    iuranBPJSTenagaKerjaBulanan,
  } = input;

  const gajiBrutoTahunan = gajiBrutoPerBulan * 12;

  const biayaJabatanPerBulan = Math.min(
    gajiBrutoPerBulan * (biayaJabatanPersen / 100),
    500_000
  );
  const biayaJabatanTahunan = biayaJabatanPerBulan * 12;

  const iuranPensiunBulanan = iuranBPJSKesehatanKaryawan + iuranBPJSTenagaKerjaBulanan;
  const iuranPensiunTahunan = iuranPensiunBulanan * 12;

  const penghasilanNetoBruto = gajiBrutoTahunan - biayaJabatanTahunan - iuranPensiunTahunan;
  const ptkp = PTKP_TAHUNAN[statusPTKP];
  const pkp = Math.max(0, penghasilanNetoBruto - ptkp);

  // Pembulatan PKP ke bawah ribuan
  const pkpDibulatkan = Math.floor(pkp / 1000) * 1000;

  const { total: pphTerutangTahunan, lapisan: lapisanPajak } = hitungPajakProgresif(pkpDibulatkan);
  const pphTerutangBulanan = pphTerutangTahunan / 12;
  const takeHomePay = gajiBrutoPerBulan - pphTerutangBulanan - iuranPensiunBulanan;

  return {
    gajiBrutoTahunan,
    biayaJabatanTahunan,
    iuranPensiunTahunan,
    penghasilanNetoBruto,
    ptkp,
    pkp: pkpDibulatkan,
    pphTerutangTahunan,
    pphTerutangBulanan,
    takeHomePay,
    lapisanPajak,
  };
}

// ─── PPh 23 ───────────────────────────────────────────────────────────────────

export type JenisPenghasilanPPh23 =
  | "jasa-teknik"
  | "jasa-manajemen"
  | "jasa-konstruksi"
  | "jasa-konsultan"
  | "jasa-lain"
  | "sewa-harta"
  | "dividen"
  | "bunga"
  | "royalti";

const TARIF_PPH23: Record<JenisPenghasilanPPh23, number> = {
  "jasa-teknik": 2,
  "jasa-manajemen": 2,
  "jasa-konstruksi": 2,
  "jasa-konsultan": 2,
  "jasa-lain": 2,
  "sewa-harta": 2,
  dividen: 15,
  bunga: 15,
  royalti: 15,
};

export interface PPh23Input {
  nilaiTransaksiBruto: number;
  jenisPenghasilan: JenisPenghasilanPPh23;
  punyaNPWP: boolean;
}

export interface PPh23Result {
  nilaiTransaksiBruto: number;
  tarifPersen: number;
  tarifEfektifPersen: number; // 2x lipat jika tidak ber-NPWP
  pajak: number;
  nilaiDiterima: number;
}

export function hitungPPh23(input: PPh23Input): PPh23Result {
  const { nilaiTransaksiBruto, jenisPenghasilan, punyaNPWP } = input;

  const tarifPersen = TARIF_PPH23[jenisPenghasilan];
  const tarifEfektifPersen = punyaNPWP ? tarifPersen : tarifPersen * 2;

  const pajak = nilaiTransaksiBruto * (tarifEfektifPersen / 100);
  const nilaiDiterima = nilaiTransaksiBruto - pajak;

  return {
    nilaiTransaksiBruto,
    tarifPersen,
    tarifEfektifPersen,
    pajak,
    nilaiDiterima,
  };
}
