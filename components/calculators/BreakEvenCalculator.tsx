"use client";

import { useState } from "react";
import { hitungBreakEven, type BreakEvenResult } from "@/lib/calculators/trading-saham-kripto";
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

export function BreakEvenCalculator() {
  const [hargaBeli, setHargaBeli] = useState(1000);
  const [feeBeli, setFeeBeli] = useState(0.15);
  const [feeJual, setFeeJual] = useState(0.25);
  const [result, setResult] = useState<BreakEvenResult | null>(null);

  function hitung() {
    setResult(hitungBreakEven({ hargaBeli, feeBeli, feeJual }));
  }

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Harga Beli" value={hargaBeli} onChange={setHargaBeli} prefix="Rp" min={1} />
          <InputNumber label="Fee Beli" value={feeBeli} onChange={setFeeBeli} suffix="%" step={0.01} hint="Contoh: 0.15 untuk 0.15%" />
          <InputNumber label="Fee Jual" value={feeJual} onChange={setFeeJual} suffix="%" step={0.01} hint="Contoh: 0.25 untuk 0.25%" />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung Break Even
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard
            label="Harga Break Even"
            value={fmtRp(result.hargaBreakEven)}
            subLabel={`Kenaikan yang dibutuhkan: ${result.persen.toFixed(2)}%`}
            size="lg"
            color="emerald"
            highlight
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Harga Beli" value={fmtRp(hargaBeli)} />
            <ResultCard label="Selisih BEP" value={fmtRp(result.hargaBreakEven - hargaBeli)} color="amber" />
          </div>
          <HasilAnalisaCard
            status="sedang"
            judul={`Kamu harus jual minimal di ${fmtRp(result.hargaBreakEven)} untuk impas`}
            narasi={`Total biaya transaksi (beli + jual) sebesar ${(feeBeli + feeJual).toFixed(2)}% memerlukan harga naik ${result.persen.toFixed(2)}% agar tidak rugi.`}
            actionItems={[
              "Pertimbangkan fee transaksi sebelum masuk posisi",
              "Gunakan broker dengan fee kompetitif untuk saham/kripto",
              "Pastikan target profit minimal 2x dari biaya transaksi",
            ]}
          />
          <button onClick={() => setResult(null)} className="w-full rounded-xl border py-3.5 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text-primary)", backgroundColor: "var(--bg-secondary)" }}>
            Hitung Ulang
          </button>
        </div>
      )}
    </div>
  );
}
