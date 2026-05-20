"use client";

import { useState } from "react";
import { hitungUntungRugi, type UntungRugiResult } from "@/lib/calculators/trading-saham-kripto";
import { InputNumber } from "./InputNumber";
import { ResultCard } from "./ResultCard";
import { HasilAnalisaCard } from "./HasilAnalisaCard";

function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function analisa(r: UntungRugiResult) {
  if (r.statusProfitLoss === "profit") {
    return {
      status: "baik" as const,
      badge: "Profit",
      judul: `Transaksi menghasilkan profit ${r.profitLossPersen.toFixed(2)}%`,
      narasi: `Setelah dipotong biaya transaksi, kamu meraih keuntungan bersih ${fmtRp(r.profitLoss)}. Harga break even berada di ${fmtRp(r.breakEvenPrice)}.`,
      actionItems: [
        "Catat transaksi ini untuk evaluasi strategi trading",
        "Pertimbangkan apakah profit sudah sesuai target risk/reward ratio",
        "Sisihkan sebagian profit untuk dana darurat atau diversifikasi",
      ],
    };
  } else if (r.statusProfitLoss === "loss") {
    return {
      status: "buruk" as const,
      badge: "Rugi",
      judul: `Transaksi mengalami kerugian ${Math.abs(r.profitLossPersen).toFixed(2)}%`,
      narasi: `Kerugian bersih setelah biaya transaksi: ${fmtRp(Math.abs(r.profitLoss))}. Harga break even ada di ${fmtRp(r.breakEvenPrice)}.`,
      actionItems: [
        "Evaluasi apakah stop loss sudah ditetapkan sebelum entry",
        "Pastikan kerugian tidak melebihi 1–2% total modal per trade",
        "Hindari averaging down tanpa rencana yang jelas",
      ],
    };
  } else {
    return {
      status: "sedang" as const,
      badge: "Impas",
      judul: "Transaksi impas — tidak untung tidak rugi",
      narasi: `Total biaya transaksi: ${fmtRp(r.biayaTransaksiBeli + r.biayaTransaksiJual)}. Perhatikan biaya transaksi yang dapat menggerus profit.`,
      actionItems: ["Perhatikan fee broker — pilih yang kompetitif"],
    };
  }
}

export function UntungRugiCalculator() {
  const [hargaBeli, setHargaBeli] = useState(1000);
  const [hargaJual, setHargaJual] = useState(1200);
  const [jumlahUnit, setJumlahUnit] = useState(1000);
  const [feeBeli, setFeeBeli] = useState(0.15);
  const [feeJual, setFeeJual] = useState(0.25);
  const [result, setResult] = useState<UntungRugiResult | null>(null);

  function hitung() {
    setResult(hitungUntungRugi({ hargaBeli, hargaJual, jumlahUnit, feeBeli, feeJual }));
  }

  const analisaData = result ? analisa(result) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Harga Beli" value={hargaBeli} onChange={setHargaBeli} prefix="Rp" min={1} />
          <InputNumber label="Harga Jual" value={hargaJual} onChange={setHargaJual} prefix="Rp" min={1} />
          <InputNumber label="Jumlah Unit / Lembar" value={jumlahUnit} onChange={setJumlahUnit} min={1} />
          <InputNumber label="Fee Beli" value={feeBeli} onChange={setFeeBeli} suffix="%" step={0.01} hint="Contoh: 0.15 untuk 0.15%" />
          <InputNumber label="Fee Jual" value={feeJual} onChange={setFeeJual} suffix="%" step={0.01} />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung Profit/Loss
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard
            label={result.statusProfitLoss === "profit" ? "Profit Bersih" : "Kerugian Bersih"}
            value={fmtRp(Math.abs(result.profitLoss))}
            subLabel={`${result.profitLossPersen >= 0 ? "+" : ""}${result.profitLossPersen.toFixed(2)}%`}
            size="lg"
            color={result.statusProfitLoss === "profit" ? "emerald" : "red"}
            highlight
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Total Modal Beli" value={fmtRp(result.totalBiayaBeli)} />
            <ResultCard label="Hasil Bersih Jual" value={fmtRp(result.hasilBersihJual)} />
            <ResultCard label="Harga Break Even" value={fmtRp(result.breakEvenPrice)} />
            <ResultCard label="Biaya Transaksi" value={fmtRp(result.biayaTransaksiBeli + result.biayaTransaksiJual)} color="amber" />
          </div>
          {analisaData && (
            <HasilAnalisaCard
              status={analisaData.status}
              badge={analisaData.badge}
              judul={analisaData.judul}
              narasi={analisaData.narasi}
              actionItems={analisaData.actionItems}
            />
          )}
          <button onClick={() => setResult(null)} className="w-full rounded-xl border py-3.5 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text-primary)", backgroundColor: "var(--bg-secondary)" }}>
            Hitung Ulang
          </button>
        </div>
      )}
    </div>
  );
}
