"use client";

import { useState } from "react";
import { hitungPositionSizing, type PositionSizingResult } from "@/lib/calculators/trading-saham-kripto";
import { InputNumber } from "./InputNumber";
import { InputSlider } from "./InputSlider";
import { ResultCard } from "./ResultCard";
import { HasilAnalisaCard } from "./HasilAnalisaCard";

function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function analisa(r: PositionSizingResult, risikoPersen: number) {
  if (risikoPersen <= 2) {
    return {
      status: "baik" as const,
      badge: "Risiko Terkontrol",
      judul: `Position size aman — risiko ${risikoPersen}% dari modal`,
      narasi: `Kamu berisiko ${fmtRp(r.nominalRisiko)} per trade dengan posisi ${r.jumlahLot} lot (${Math.round(r.jumlahUnit)} unit). Nilai posisi ${fmtRp(r.nilaiPosisi)} atau ${r.persenModalDigunakan.toFixed(1)}% dari modal.`,
      actionItems: [
        "Risiko di bawah 2% adalah praktik manajemen risiko yang baik",
        "Pastikan stop loss sudah dipasang di platform trading kamu",
        "Catat trade ini dalam jurnal trading untuk evaluasi",
      ],
    };
  } else if (risikoPersen <= 5) {
    return {
      status: "sedang" as const,
      badge: "Risiko Sedang",
      judul: `Risiko ${risikoPersen}% — masih tolerabel tapi perlu hati-hati`,
      narasi: `Dengan risiko ${fmtRp(r.nominalRisiko)}, beberapa trade loss berturut-turut bisa signifikan mempengaruhi modal.`,
      actionItems: [
        "Pertimbangkan mengurangi risiko ke 1–2% per trade",
        "Pastikan win rate dan R:R ratio mendukung profitabilitas",
      ],
    };
  } else {
    return {
      status: "buruk" as const,
      badge: "Risiko Tinggi",
      judul: `Risiko ${risikoPersen}% terlalu tinggi untuk satu trade`,
      narasi: `Risiko ${fmtRp(r.nominalRisiko)} per trade sangat berbahaya. Beberapa loss berturut-turut bisa menghancurkan modal dengan cepat.`,
      actionItems: [
        "Kurangi risiko ke maksimal 2% per trade",
        "Pertimbangkan mempersempit stop loss atau memperkecil posisi",
      ],
    };
  }
}

export function PositionSizingCalculator() {
  const [modal, setModal] = useState(10_000_000);
  const [risiko, setRisiko] = useState(2);
  const [hargaEntry, setHargaEntry] = useState(1000);
  const [stopLoss, setStopLoss] = useState(950);
  const [result, setResult] = useState<PositionSizingResult | null>(null);

  function hitung() {
    setResult(hitungPositionSizing({ modal, risikoPersenModal: risiko, hargaEntry, stopLoss }));
  }

  const analisaData = result ? analisa(result, risiko) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Total Modal Trading" value={modal} onChange={setModal} prefix="Rp" min={100_000} step={100_000} />
          <InputSlider
            label="Risiko per Trade"
            value={risiko}
            onChange={setRisiko}
            min={0.5}
            max={10}
            step={0.5}
            formatValue={(v) => `${v}% dari modal`}
          />
          <InputNumber label="Harga Entry" value={hargaEntry} onChange={setHargaEntry} prefix="Rp" min={1} />
          <InputNumber label="Harga Stop Loss" value={stopLoss} onChange={setStopLoss} prefix="Rp" min={1} hint="Harga di mana kamu akan cut loss" />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung Position Size
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Jumlah Lot" value={`${result.jumlahLot} lot`} size="lg" color="emerald" highlight />
            <ResultCard label="Jumlah Unit" value={`${Math.round(result.jumlahUnit).toLocaleString("id-ID")}`} size="lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Nominal Risiko" value={fmtRp(result.nominalRisiko)} color="red" />
            <ResultCard label="Nilai Posisi" value={fmtRp(result.nilaiPosisi)} />
            <ResultCard label="Risiko per Unit" value={fmtRp(result.risikoPerUnit)} />
            <ResultCard label="% Modal Dipakai" value={`${result.persenModalDigunakan.toFixed(1)}%`} />
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
