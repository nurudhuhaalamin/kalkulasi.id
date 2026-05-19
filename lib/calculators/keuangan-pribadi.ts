// Calculator engine: Keuangan Pribadi

// ─── Dana Darurat ─────────────────────────────────────────────────────────────

export type StatusPekerjaan = "karyawan-tetap" | "freelancer" | "wirausaha" | "lainnya";

export interface DanaDaruratInput {
  pengeluaranBulanan: number;
  statusPekerjaan: StatusPekerjaan;
  jumlahTanggungan: number;
}

export interface DanaDaruratResult {
  targetMinimal: number; // 3 bulan
  targetDisarankan: number; // 6 bulan
  targetMaksimal: number; // 12 bulan
  rekomendasiBulan: number;
  targetRekomendasi: number;
  alasanRekomendasi: string;
}

function getBulanRekomendasi(status: StatusPekerjaan, tanggungan: number): number {
  const baseBulan: Record<StatusPekerjaan, number> = {
    "karyawan-tetap": 3,
    freelancer: 6,
    wirausaha: 6,
    lainnya: 6,
  };
  const base = baseBulan[status];
  const tambahan = tanggungan >= 3 ? 3 : tanggungan >= 1 ? 2 : 0;
  return Math.min(12, base + tambahan);
}

function getAlaanRekomendasi(status: StatusPekerjaan, tanggungan: number): string {
  const bulan = getBulanRekomendasi(status, tanggungan);
  if (status === "karyawan-tetap" && tanggungan === 0) {
    return "Sebagai karyawan tetap tanpa tanggungan, 3 bulan sudah cukup sebagai jaring pengaman dasar.";
  } else if (status === "karyawan-tetap") {
    return `Sebagai karyawan tetap dengan ${tanggungan} tanggungan, ${bulan} bulan memberikan keamanan yang lebih baik.`;
  } else {
    return `Sebagai ${status} dengan pendapatan yang lebih tidak menentu, ${bulan} bulan sangat disarankan.`;
  }
}

export function hitungDanaDarurat(input: DanaDaruratInput): DanaDaruratResult {
  const { pengeluaranBulanan, statusPekerjaan, jumlahTanggungan } = input;

  const rekomendasiBulan = getBulanRekomendasi(statusPekerjaan, jumlahTanggungan);
  const targetRekomendasi = pengeluaranBulanan * rekomendasiBulan;

  return {
    targetMinimal: pengeluaranBulanan * 3,
    targetDisarankan: pengeluaranBulanan * 6,
    targetMaksimal: pengeluaranBulanan * 12,
    rekomendasiBulan,
    targetRekomendasi,
    alasanRekomendasi: getAlaanRekomendasi(statusPekerjaan, jumlahTanggungan),
  };
}

// ─── Net Worth ────────────────────────────────────────────────────────────────

export interface AsetItem {
  nama: string;
  nilai: number;
}

export interface LiabilitasItem {
  nama: string;
  nilai: number;
}

export interface NetWorthInput {
  aset: AsetItem[];
  liabilitas: LiabilitasItem[];
}

export interface NetWorthResult {
  totalAset: number;
  totalLiabilitas: number;
  netWorth: number;
  rasioAsetLiabilitas: number;
  statusFinansial: "sehat" | "perlu-perhatian" | "kritis";
}

export function hitungNetWorth(input: NetWorthInput): NetWorthResult {
  const totalAset = input.aset.reduce((sum, a) => sum + a.nilai, 0);
  const totalLiabilitas = input.liabilitas.reduce((sum, l) => sum + l.nilai, 0);
  const netWorth = totalAset - totalLiabilitas;
  const rasioAsetLiabilitas = totalLiabilitas > 0 ? totalAset / totalLiabilitas : Infinity;

  const statusFinansial =
    netWorth > 0 && rasioAsetLiabilitas > 2
      ? "sehat"
      : netWorth > 0
      ? "perlu-perhatian"
      : "kritis";

  return { totalAset, totalLiabilitas, netWorth, rasioAsetLiabilitas, statusFinansial };
}

// ─── Pelunasan Utang ──────────────────────────────────────────────────────────

export interface PelunasanUtangInput {
  totalUtang: number;
  sukuBungaTahunan: number;
  pembayaranBulanan: number;
  pembayaranEkstraBulanan?: number;
}

export interface PelunasanUtangBulan {
  bulanKe: number;
  pembayaran: number;
  pokok: number;
  bunga: number;
  sisaUtang: number;
}

export interface PelunasanUtangResult {
  bulanPelunasan: number;
  tahunPelunasan: number;
  totalBungaDibayar: number;
  totalPembayaran: number;
  jadwal: PelunasanUtangBulan[];
  hematBunga?: number; // dibanding tanpa pembayaran ekstra
}

export function hitungPelunasanUtang(input: PelunasanUtangInput): PelunasanUtangResult {
  const { totalUtang, sukuBungaTahunan, pembayaranBulanan, pembayaranEkstraBulanan = 0 } = input;

  const r = sukuBungaTahunan / 100 / 12;
  const totalBayarBulanan = pembayaranBulanan + pembayaranEkstraBulanan;

  let sisaUtang = totalUtang;
  let totalBungaDibayar = 0;
  let totalPembayaran = 0;
  const jadwal: PelunasanUtangBulan[] = [];

  let bulanKe = 0;

  while (sisaUtang > 0.01 && bulanKe < 1200) {
    bulanKe++;
    const bunga = sisaUtang * r;
    const bayarBulanIni = Math.min(totalBayarBulanan, sisaUtang + bunga);
    const pokok = bayarBulanIni - bunga;
    sisaUtang = Math.max(0, sisaUtang - pokok);

    totalBungaDibayar += bunga;
    totalPembayaran += bayarBulanIni;

    jadwal.push({
      bulanKe,
      pembayaran: bayarBulanIni,
      pokok,
      bunga,
      sisaUtang,
    });
  }

  return {
    bulanPelunasan: bulanKe,
    tahunPelunasan: Math.ceil(bulanKe / 12),
    totalBungaDibayar,
    totalPembayaran,
    jadwal,
  };
}

// ─── Target Tabungan ─────────────────────────────────────────────────────────

export interface TargetTabunganInput {
  targetNominal: number;
  tabunganAwal: number;
  lamaTabunganBulan: number;
  returnTahunanPersen?: number;
}

export interface TargetTabunganResult {
  tabunganBulanan: number;
  totalTabunganDisetor: number;
  totalBunga: number;
}

export function hitungTargetTabungan(input: TargetTabunganInput): TargetTabunganResult {
  const { targetNominal, tabunganAwal, lamaTabunganBulan, returnTahunanPersen = 0 } = input;

  const r = returnTahunanPersen / 100 / 12;
  const n = lamaTabunganBulan;

  const futureValueAwal = tabunganAwal * Math.pow(1 + r, n);
  const sisaYangDibutuhkan = Math.max(0, targetNominal - futureValueAwal);

  const tabunganBulanan =
    r === 0
      ? sisaYangDibutuhkan / n
      : (sisaYangDibutuhkan * r) / (Math.pow(1 + r, n) - 1);

  const totalTabunganDisetor = tabunganAwal + tabunganBulanan * n;
  const totalBunga = targetNominal - totalTabunganDisetor;

  return { tabunganBulanan, totalTabunganDisetor, totalBunga: Math.max(0, totalBunga) };
}

// ─── Anggaran Bulanan ─────────────────────────────────────────────────────────

export interface AnggaranBulananInput {
  pendapatanBulanan: number;
  pengeluaranKebutuhan: number;
  pengeluaranKeinginan: number;
  tabunganInvestasi: number;
}

export interface AnggaranBulananResult {
  totalPengeluaran: number;
  surplus: number;
  persenKebutuhan: number;
  persenKeinginan: number;
  persenTabungan: number;
  statusKesehatan: "surplus" | "impas" | "defisit";
  rekomendasiFramework: {
    kebutuhan: number;
    keinginan: number;
    tabungan: number;
    framework: "50/30/20";
  };
}

export function hitungAnggaranBulanan(input: AnggaranBulananInput): AnggaranBulananResult {
  const { pendapatanBulanan, pengeluaranKebutuhan, pengeluaranKeinginan, tabunganInvestasi } = input;

  const totalPengeluaran = pengeluaranKebutuhan + pengeluaranKeinginan + tabunganInvestasi;
  const surplus = pendapatanBulanan - totalPengeluaran;

  const persenKebutuhan = (pengeluaranKebutuhan / pendapatanBulanan) * 100;
  const persenKeinginan = (pengeluaranKeinginan / pendapatanBulanan) * 100;
  const persenTabungan = (tabunganInvestasi / pendapatanBulanan) * 100;

  const statusKesehatan = surplus > 0 ? "surplus" : surplus === 0 ? "impas" : "defisit";

  return {
    totalPengeluaran,
    surplus,
    persenKebutuhan,
    persenKeinginan,
    persenTabungan,
    statusKesehatan,
    rekomendasiFramework: {
      kebutuhan: pendapatanBulanan * 0.5,
      keinginan: pendapatanBulanan * 0.3,
      tabungan: pendapatanBulanan * 0.2,
      framework: "50/30/20",
    },
  };
}
