"use client";

import { useState } from "react";
import { hitungBungaMajemuk, type BungaMajemukResult } from "@/lib/calculators/investasi";
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

function analisa(r: BungaMajemukResult, tahun: number) {
  if (r.pertumbuhanPersen >= 100) {
    return {
      status: "baik" as const,
      badge: "Pertumbuhan Kuat",
      judul: `Modal berkembang ${r.pertumbuhanPersen.toFixed(0)}% dalam ${tahun} tahun`,
      narasi: `Bunga majemuk menghasilkan ${fmtRp(r.totalBunga)} di atas total modal yang kamu setor ${fmtRp(r.totalModalDisetor)}.`,
      actionItems: [
        "Investasi jangka panjang memanfaatkan efek compounding secara maksimal",
        "Jangan sentuh investasi ini — reinvesting return adalah kuncinya",
        "Tambah kontribusi rutin kapanpun memungkinkan",
      ],
    };
  } else {
    return {
      status: "sedang" as const,
      badge: "Mulai Berkembang",
      judul: `Pertumbuhan ${r.pertumbuhanPersen.toFixed(0)}% — compounding mulai bekerja`,
      narasi: `Dengan ${tahun} tahun, modal tumbuh menjadi ${fmtRp(r.nilaiAkhir)}. Semakin lama investasi, semakin kuat efek compounding.`,
      actionItems: [
        "Perpanjang horizon investasi untuk hasil compounding yang lebih dramatis",
        "Naikkan kontribusi bulanan secara bertahap seiring kenaikan gaji",
      ],
    };
  }
}

export function BungaMajemukCalculator() {
  const [modalAwal, setModalAwal] = useState(10_000_000);
  const [kontribusi, setKontribusi] = useState(1_000_000);
  const [returnTahunan, setReturnTahunan] = useState(10);
  const [tahun, setTahun] = useState(10);
  const [result, setResult] = useState<BungaMajemukResult | null>(null);

  function hitung() {
    setResult(
      hitungBungaMajemuk({
        modalAwal,
        kontribusiBulanan: kontribusi,
        returnTahunanPersen: returnTahunan,
        lamaInvestasiTahun: tahun,
        frekuensiCompounding: 12,
      })
    );
  }

  const analisaData = result ? analisa(result, tahun) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Modal Awal" value={modalAwal} onChange={setModalAwal} prefix="Rp" min={0} step={1_000_000} />
          <InputNumber label="Kontribusi Bulanan" value={kontribusi} onChange={setKontribusi} prefix="Rp" min={0} step={100_000} />
          <InputSlider
            label="Return Tahunan"
            value={returnTahunan}
            onChange={setReturnTahunan}
            min={1}
            max={30}
            step={0.5}
            formatValue={(v) => `${v}% per tahun`}
          />
          <InputSlider
            label="Lama Investasi"
            value={tahun}
            onChange={setTahun}
            min={1}
            max={40}
            step={1}
            formatValue={(v) => `${v} tahun`}
          />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung Bunga Majemuk
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard label="Nilai Akhir" value={fmtRp(result.nilaiAkhir)} size="lg" color="emerald" highlight />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Total Modal Disetor" value={fmtRp(result.totalModalDisetor)} />
            <ResultCard label="Total Bunga" value={fmtRp(result.totalBunga)} color="emerald" />
            <ResultCard label="Pertumbuhan" value={`${result.pertumbuhanPersen.toFixed(1)}%`} color="emerald" />
            <ResultCard label="Lama Investasi" value={`${tahun} tahun`} />
          </div>

          {/* Yearly breakdown mini table */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Perkembangan Per Tahun
            </p>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    {["Tahun", "Nilai Akhir", "Modal Disetor", "Bunga"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.detailPerTahun.map((row, i) => (
                    <tr key={row.tahun} style={{ borderTop: "1px solid var(--border)", backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)" }}>
                      <td className="px-3 py-2 font-medium" style={{ color: "var(--text-primary)" }}>Thn {row.tahun}</td>
                      <td className="px-3 py-2 tabular-nums font-semibold" style={{ color: "var(--accent)" }}>{fmtRp(row.nilaiAkhir)}</td>
                      <td className="px-3 py-2 tabular-nums" style={{ color: "var(--text-secondary)" }}>{fmtRp(row.totalModalDisetor)}</td>
                      <td className="px-3 py-2 tabular-nums" style={{ color: "var(--orange)" }}>{fmtRp(row.bungaTahunIni)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
