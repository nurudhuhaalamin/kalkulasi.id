"use client";

import { useState } from "react";
import { hitungDCA, type DCAResult } from "@/lib/calculators/investasi";
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

function analisa(r: DCAResult) {
  if (r.profitLossPersen >= 15) {
    return {
      status: "baik" as const,
      badge: "Profit Bagus",
      judul: `DCA menghasilkan return +${r.profitLossPersen.toFixed(1)}% dari total modal`,
      narasi: `Rata-rata harga beli ${fmtRp(r.rataRataHarga)} lebih rendah dari harga terakhir. Konsistensi DCA membantu menurunkan average price.`,
      actionItems: [
        "Terus DCA secara konsisten — kekuatan ada di kedisiplinan jangka panjang",
        "Jangan stop DCA saat harga turun — itu adalah kesempatan beli lebih murah",
        "Review alokasi investasi setiap 6-12 bulan",
      ],
    };
  } else if (r.profitLossPersen >= 0) {
    return {
      status: "sedang" as const,
      badge: "Profit Kecil",
      judul: `Return ${r.profitLossPersen.toFixed(1)}% — DCA bekerja`,
      narasi: `Total modal yang diinvestasikan ${fmtRp(r.totalModal)}. Nilai portofolio saat ini ${fmtRp(r.nilaiPortofolio)}.`,
      actionItems: [
        "DCA butuh waktu — semakin panjang horizon, semakin baik hasilnya",
        "Pertahankan konsistensi investasi bulanan",
      ],
    };
  } else {
    return {
      status: "buruk" as const,
      badge: "Masih Minus",
      judul: `Portofolio minus ${Math.abs(r.profitLossPersen).toFixed(1)}% — wajar dalam DCA`,
      narasi: `Masih di bawah modal sebesar ${fmtRp(Math.abs(r.profitLoss))}. DCA jangka pendek sering minus — yang penting adalah trend jangka panjang.`,
      actionItems: [
        "Jangan panik — ini normal dalam investasi jangka pendek",
        "Terus DCA: harga turun = beli lebih banyak unit",
        "Pastikan aset yang di-DCA memiliki fundamental yang baik",
      ],
    };
  }
}

export function DcaCalculator() {
  const [investasiBulanan, setInvestasiBulanan] = useState(1_000_000);
  const [hargaAwal, setHargaAwal] = useState(10_000);
  const [periode, setPeriode] = useState(12);
  const [hargaAkhir, setHargaAkhir] = useState(12_000);
  const [result, setResult] = useState<DCAResult | null>(null);

  function hitung() {
    // Simulate harga dengan random walk mild uptrend for the middle periods
    const hargaPerPeriode: number[] = [];
    for (let i = 0; i < periode; i++) {
      const t = i / (periode - 1);
      const trend = hargaAwal + (hargaAkhir - hargaAwal) * t;
      const noise = (Math.random() - 0.5) * 0.1 * hargaAwal;
      hargaPerPeriode.push(Math.max(1, trend + noise));
    }
    hargaPerPeriode[hargaPerPeriode.length - 1] = hargaAkhir;
    setResult(hitungDCA({ investasiBulanan, hargaPerPeriode }));
  }

  const analisaData = result ? analisa(result) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber
            label="Investasi per Bulan"
            value={investasiBulanan}
            onChange={setInvestasiBulanan}
            prefix="Rp"
            min={10_000}
            step={100_000}
          />
          <InputNumber
            label="Harga Aset Awal"
            value={hargaAwal}
            onChange={setHargaAwal}
            prefix="Rp"
            min={1}
            hint="Harga aset/saham/koin di bulan pertama"
          />
          <InputNumber
            label="Harga Aset Saat Ini"
            value={hargaAkhir}
            onChange={setHargaAkhir}
            prefix="Rp"
            min={1}
            hint="Harga aset/saham/koin terkini (bulan terakhir)"
          />
          <InputSlider
            label="Durasi DCA"
            value={periode}
            onChange={setPeriode}
            min={3}
            max={60}
            step={1}
            formatValue={(v) => `${v} bulan`}
          />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Simulasi DCA
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard
            label="Nilai Portofolio"
            value={fmtRp(result.nilaiPortofolio)}
            subLabel={`${result.profitLossPersen >= 0 ? "+" : ""}${result.profitLossPersen.toFixed(1)}% dari modal`}
            size="lg"
            color={result.profitLossPersen >= 0 ? "emerald" : "red"}
            highlight
          />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Total Modal" value={fmtRp(result.totalModal)} />
            <ResultCard label="Profit/Loss" value={fmtRp(Math.abs(result.profitLoss))} color={result.profitLoss >= 0 ? "emerald" : "red"} />
            <ResultCard label="Rata-rata Harga Beli" value={fmtRp(result.rataRataHarga)} />
            <ResultCard label="Total Unit" value={result.totalUnit.toFixed(4)} />
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
