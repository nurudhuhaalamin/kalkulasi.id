// Calculator engine: Trading Saham & Kripto

// ─── Untung/Rugi ──────────────────────────────────────────────────────────────

export interface UntungRugiInput {
  hargaBeli: number;
  hargaJual: number;
  jumlahUnit: number;
  feeBeli: number; // persentase, misalnya 0.15
  feeJual: number; // persentase, misalnya 0.25
}

export interface UntungRugiResult {
  modalBeli: number;
  biayaTransaksiBeli: number;
  totalBiayaBeli: number;
  hasilJual: number;
  biayaTransaksiJual: number;
  hasilBersihJual: number;
  profitLoss: number;
  profitLossPersen: number;
  breakEvenPrice: number;
  statusProfitLoss: "profit" | "loss" | "impas";
}

export function hitungUntungRugi(input: UntungRugiInput): UntungRugiResult {
  const { hargaBeli, hargaJual, jumlahUnit, feeBeli, feeJual } = input;

  const modalBeli = hargaBeli * jumlahUnit;
  const biayaTransaksiBeli = modalBeli * (feeBeli / 100);
  const totalBiayaBeli = modalBeli + biayaTransaksiBeli;

  const hasilJual = hargaJual * jumlahUnit;
  const biayaTransaksiJual = hasilJual * (feeJual / 100);
  const hasilBersihJual = hasilJual - biayaTransaksiJual;

  const profitLoss = hasilBersihJual - totalBiayaBeli;
  const profitLossPersen = (profitLoss / totalBiayaBeli) * 100;

  const breakEvenPrice =
    (hargaBeli * (1 + feeBeli / 100)) / (1 - feeJual / 100);

  const statusProfitLoss: "profit" | "loss" | "impas" =
    profitLoss > 0 ? "profit" : profitLoss < 0 ? "loss" : "impas";

  return {
    modalBeli,
    biayaTransaksiBeli,
    totalBiayaBeli,
    hasilJual,
    biayaTransaksiJual,
    hasilBersihJual,
    profitLoss,
    profitLossPersen,
    breakEvenPrice,
    statusProfitLoss,
  };
}

// ─── Break Even ───────────────────────────────────────────────────────────────

export interface BreakEvenInput {
  hargaBeli: number;
  feeBeli: number; // persentase
  feeJual: number; // persentase
}

export interface BreakEvenResult {
  hargaBreakEven: number;
  persen: number; // kenaikan yang dibutuhkan dari harga beli
}

export function hitungBreakEven(input: BreakEvenInput): BreakEvenResult {
  const { hargaBeli, feeBeli, feeJual } = input;

  const hargaBreakEven =
    (hargaBeli * (1 + feeBeli / 100)) / (1 - feeJual / 100);

  const persen = ((hargaBreakEven - hargaBeli) / hargaBeli) * 100;

  return { hargaBreakEven, persen };
}

// ─── Position Sizing ──────────────────────────────────────────────────────────

export interface PositionSizingInput {
  modal: number;
  risikoPersenModal: number; // misalnya 1 atau 2
  hargaEntry: number;
  stopLoss: number;
  hargaPerLot?: number; // untuk saham: 100 lembar per lot
}

export interface PositionSizingResult {
  nominalRisiko: number;
  risikoPerUnit: number;
  jumlahUnit: number;
  jumlahLot: number; // untuk saham Indonesia (1 lot = 100 lembar)
  nilaiPosisi: number;
  persenModalDigunakan: number;
}

export function hitungPositionSizing(input: PositionSizingInput): PositionSizingResult {
  const { modal, risikoPersenModal, hargaEntry, stopLoss } = input;

  const nominalRisiko = modal * (risikoPersenModal / 100);
  const risikoPerUnit = Math.abs(hargaEntry - stopLoss);

  if (risikoPerUnit === 0) {
    return {
      nominalRisiko,
      risikoPerUnit: 0,
      jumlahUnit: 0,
      jumlahLot: 0,
      nilaiPosisi: 0,
      persenModalDigunakan: 0,
    };
  }

  const jumlahUnit = nominalRisiko / risikoPerUnit;
  const jumlahLot = Math.floor(jumlahUnit / 100); // 1 lot = 100 lembar (saham Indonesia)
  const nilaiPosisi = jumlahUnit * hargaEntry;
  const persenModalDigunakan = (nilaiPosisi / modal) * 100;

  return {
    nominalRisiko,
    risikoPerUnit,
    jumlahUnit,
    jumlahLot,
    nilaiPosisi,
    persenModalDigunakan,
  };
}

// ─── Risiko per Transaksi ─────────────────────────────────────────────────────

export interface RisikoTransaksiInput {
  hargaEntry: number;
  stopLoss: number;
  jumlahUnit: number;
  modal: number;
}

export interface RisikoTransaksiResult {
  nominalRisiko: number;
  persenRisikoModal: number;
  risikoPerUnit: number;
}

export function hitungRisikoTransaksi(input: RisikoTransaksiInput): RisikoTransaksiResult {
  const { hargaEntry, stopLoss, jumlahUnit, modal } = input;

  const risikoPerUnit = Math.abs(hargaEntry - stopLoss);
  const nominalRisiko = risikoPerUnit * jumlahUnit;
  const persenRisikoModal = (nominalRisiko / modal) * 100;

  return { nominalRisiko, persenRisikoModal, risikoPerUnit };
}

// ─── Stop Loss / Take Profit ──────────────────────────────────────────────────

export interface SLTPInput {
  arahPosisi: "long" | "short";
  hargaEntry: number;
  stopLoss: number;
  riskRewardRatio: number; // misalnya 2 untuk 1:2
}

export interface SLTPResult {
  takeProfit: number;
  risikoPerUnit: number;
  profitPerUnit: number;
  riskRewardRatio: number;
}

export function hitungSLTP(input: SLTPInput): SLTPResult {
  const { arahPosisi, hargaEntry, stopLoss, riskRewardRatio } = input;

  const risikoPerUnit = Math.abs(hargaEntry - stopLoss);
  const profitPerUnit = risikoPerUnit * riskRewardRatio;

  const takeProfit =
    arahPosisi === "long"
      ? hargaEntry + profitPerUnit
      : hargaEntry - profitPerUnit;

  return { takeProfit, risikoPerUnit, profitPerUnit, riskRewardRatio };
}

// ─── Leverage ─────────────────────────────────────────────────────────────────

export interface LeverageInput {
  modal: number;
  leverage: number;
  hargaEntry: number;
  maintenanceMarginPersen: number; // biasanya 0.5%
}

export interface LeverageResult {
  exposureTotal: number;
  marginDigunakan: number;
  hargaLikuidasi: number;
  jarakLikuidasiPersen: number;
}

export function hitungLeverage(input: LeverageInput): LeverageResult {
  const { modal, leverage, hargaEntry, maintenanceMarginPersen } = input;

  const exposureTotal = modal * leverage;
  const marginDigunakan = modal;

  // Harga likuidasi untuk long: Entry × (1 - 1/leverage + maintenanceMargin/100)
  const hargaLikuidasi =
    hargaEntry * (1 - 1 / leverage + maintenanceMarginPersen / 100);

  const jarakLikuidasiPersen =
    ((hargaEntry - hargaLikuidasi) / hargaEntry) * 100;

  return { exposureTotal, marginDigunakan, hargaLikuidasi, jarakLikuidasiPersen };
}

// ─── Likuidasi ────────────────────────────────────────────────────────────────

export interface LikuidasiInput {
  arahPosisi: "long" | "short";
  hargaEntry: number;
  leverage: number;
  maintenanceMarginRatePersen: number;
}

export interface LikuidasiResult {
  hargaLikuidasi: number;
  jarakDariEntryPersen: number;
  buffer: string;
}

export function hitungLikuidasi(input: LikuidasiInput): LikuidasiResult {
  const { arahPosisi, hargaEntry, leverage, maintenanceMarginRatePersen } = input;

  const mmr = maintenanceMarginRatePersen / 100;

  const hargaLikuidasi =
    arahPosisi === "long"
      ? hargaEntry * (1 - 1 / leverage + mmr)
      : hargaEntry * (1 + 1 / leverage - mmr);

  const jarakDariEntryPersen =
    (Math.abs(hargaEntry - hargaLikuidasi) / hargaEntry) * 100;

  const buffer =
    jarakDariEntryPersen < 5
      ? "Sangat berisiko — jarak likuidasi sangat dekat"
      : jarakDariEntryPersen < 15
      ? "Berisiko — pertimbangkan leverage lebih rendah"
      : "Cukup aman — namun tetap pantau posisi";

  return { hargaLikuidasi, jarakDariEntryPersen, buffer };
}
