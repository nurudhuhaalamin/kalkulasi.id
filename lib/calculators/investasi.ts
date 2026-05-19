// Calculator engine: Investasi & Portofolio

// ─── DCA ─────────────────────────────────────────────────────────────────────

export interface DCAInput {
  investasiBulanan: number;
  hargaPerPeriode: number[]; // harga aset per bulan
}

export interface DCAPeriode {
  periode: number;
  harga: number;
  unitDibeli: number;
  totalUnit: number;
  totalModal: number;
  nilaiPortofolio: number;
  rataRataHarga: number;
}

export interface DCAResult {
  totalModal: number;
  totalUnit: number;
  rataRataHarga: number;
  nilaiPortofolio: number;
  profitLoss: number;
  profitLossPersen: number;
  periodeDetail: DCAPeriode[];
}

export function hitungDCA(input: DCAInput): DCAResult {
  const { investasiBulanan, hargaPerPeriode } = input;

  let totalUnit = 0;
  let totalModal = 0;
  const periodeDetail: DCAPeriode[] = [];

  for (let i = 0; i < hargaPerPeriode.length; i++) {
    const harga = hargaPerPeriode[i];
    const unitDibeli = investasiBulanan / harga;
    totalUnit += unitDibeli;
    totalModal += investasiBulanan;

    const nilaiPortofolio = totalUnit * harga;
    const rataRataHarga = totalModal / totalUnit;

    periodeDetail.push({
      periode: i + 1,
      harga,
      unitDibeli,
      totalUnit,
      totalModal,
      nilaiPortofolio,
      rataRataHarga,
    });
  }

  const hargaAkhir = hargaPerPeriode[hargaPerPeriode.length - 1];
  const nilaiPortofolio = totalUnit * hargaAkhir;
  const rataRataHarga = totalModal / totalUnit;
  const profitLoss = nilaiPortofolio - totalModal;
  const profitLossPersen = (profitLoss / totalModal) * 100;

  return {
    totalModal,
    totalUnit,
    rataRataHarga,
    nilaiPortofolio,
    profitLoss,
    profitLossPersen,
    periodeDetail,
  };
}

// ─── Bunga Majemuk ────────────────────────────────────────────────────────────

export interface BungaMajemukInput {
  modalAwal: number;
  kontribusiBulanan: number;
  returnTahunanPersen: number;
  lamaInvestasiTahun: number;
  frekuensiCompounding: number; // 12 = bulanan, 1 = tahunan
}

export interface BungaMajemukTahun {
  tahun: number;
  nilaiAwal: number;
  kontribusiTahunIni: number;
  bungaTahunIni: number;
  nilaiAkhir: number;
  totalModalDisetor: number;
}

export interface BungaMajemukResult {
  nilaiAkhir: number;
  totalModalDisetor: number;
  totalBunga: number;
  pertumbuhanPersen: number;
  detailPerTahun: BungaMajemukTahun[];
}

export function hitungBungaMajemuk(input: BungaMajemukInput): BungaMajemukResult {
  const { modalAwal, kontribusiBulanan, returnTahunanPersen, lamaInvestasiTahun, frekuensiCompounding } = input;

  const r = returnTahunanPersen / 100 / frekuensiCompounding;
  const n = frekuensiCompounding;
  const detailPerTahun: BungaMajemukTahun[] = [];

  let nilai = modalAwal;
  let totalModalDisetor = modalAwal;

  for (let tahun = 1; tahun <= lamaInvestasiTahun; tahun++) {
    const nilaiAwal = nilai;
    let bungaTahunIni = 0;
    const kontribusiTahunIni = kontribusiBulanan * 12;

    for (let periode = 0; periode < n; periode++) {
      const bungaPeriode = nilai * r;
      bungaTahunIni += bungaPeriode;
      nilai += bungaPeriode;
      // Tambah kontribusi setiap bulan (12/n per periode compounding)
      const kontribusiPerPeriode = (kontribusiBulanan * 12) / n;
      nilai += kontribusiPerPeriode;
    }

    totalModalDisetor += kontribusiTahunIni;

    detailPerTahun.push({
      tahun,
      nilaiAwal,
      kontribusiTahunIni,
      bungaTahunIni,
      nilaiAkhir: nilai,
      totalModalDisetor,
    });
  }

  const totalBunga = nilai - totalModalDisetor;
  const pertumbuhanPersen = ((nilai - modalAwal) / modalAwal) * 100;

  return {
    nilaiAkhir: nilai,
    totalModalDisetor,
    totalBunga,
    pertumbuhanPersen,
    detailPerTahun,
  };
}

// ─── Nilai Masa Depan ─────────────────────────────────────────────────────────

export interface NilaiMasaDepanInput {
  nilaiSekarang: number;
  returnTahunanPersen: number;
  lamaInvestasiTahun: number;
  kontribusiBulanan?: number;
}

export interface NilaiMasaDepanResult {
  nilaiMasaDepan: number;
  totalModalDisetor: number;
  totalBunga: number;
  kelipatanModal: number;
}

export function hitungNilaiMasaDepan(input: NilaiMasaDepanInput): NilaiMasaDepanResult {
  const { nilaiSekarang, returnTahunanPersen, lamaInvestasiTahun, kontribusiBulanan = 0 } = input;

  const r = returnTahunanPersen / 100;
  const n = lamaInvestasiTahun;

  const fvPokokAwal = nilaiSekarang * Math.pow(1 + r, n);

  const rBulanan = returnTahunanPersen / 100 / 12;
  const nBulanan = n * 12;
  const fvKontribusi =
    rBulanan > 0
      ? kontribusiBulanan * ((Math.pow(1 + rBulanan, nBulanan) - 1) / rBulanan)
      : kontribusiBulanan * nBulanan;

  const nilaiMasaDepan = fvPokokAwal + fvKontribusi;
  const totalModalDisetor = nilaiSekarang + kontribusiBulanan * nBulanan;
  const totalBunga = nilaiMasaDepan - totalModalDisetor;
  const kelipatanModal = nilaiMasaDepan / nilaiSekarang;

  return { nilaiMasaDepan, totalModalDisetor, totalBunga, kelipatanModal };
}

// ─── Pensiun / FIRE ───────────────────────────────────────────────────────────

export interface PensiunFIREInput {
  pengeluaranBulananSaatPensiun: number;
  usiaSaatIni: number;
  usiaTargetPensiun: number;
  returnTahunanPersen: number;
  withdrawalRatePersen: number; // default 4%
  tabunganSaatIni: number;
}

export interface PensiunFIREResult {
  targetDanaPensiun: number;
  tabunganBulananYangDibutuhkan: number;
  lamaMenujuPensiun: number;
  cukupDenganTabunganSaatIni: boolean;
  proyeksiNilaiTabunganSaatIni: number;
  kekuranganDana: number;
}

export function hitungPensiunFIRE(input: PensiunFIREInput): PensiunFIREResult {
  const {
    pengeluaranBulananSaatPensiun,
    usiaSaatIni,
    usiaTargetPensiun,
    returnTahunanPersen,
    withdrawalRatePersen,
    tabunganSaatIni,
  } = input;

  const pengeluaranTahunan = pengeluaranBulananSaatPensiun * 12;
  const targetDanaPensiun = pengeluaranTahunan / (withdrawalRatePersen / 100);
  const lamaMenujuPensiun = usiaTargetPensiun - usiaSaatIni;

  const r = returnTahunanPersen / 100;
  const proyeksiNilaiTabunganSaatIni = tabunganSaatIni * Math.pow(1 + r, lamaMenujuPensiun);

  const kekuranganDana = Math.max(0, targetDanaPensiun - proyeksiNilaiTabunganSaatIni);

  const rBulanan = r / 12;
  const nBulanan = lamaMenujuPensiun * 12;

  const tabunganBulananYangDibutuhkan =
    kekuranganDana <= 0
      ? 0
      : rBulanan > 0
      ? (kekuranganDana * rBulanan) / (Math.pow(1 + rBulanan, nBulanan) - 1)
      : kekuranganDana / nBulanan;

  return {
    targetDanaPensiun,
    tabunganBulananYangDibutuhkan,
    lamaMenujuPensiun,
    cukupDenganTabunganSaatIni: kekuranganDana <= 0,
    proyeksiNilaiTabunganSaatIni,
    kekuranganDana,
  };
}
