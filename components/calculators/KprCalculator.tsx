"use client";

import { useState } from "react";
import { hitungKPR, type KPRResult } from "@/lib/calculators/properti";
import { InputNumber } from "./InputNumber";
import { InputSlider } from "./InputSlider";
import { ResultCard } from "./ResultCard";
import { HasilAnalisaCard } from "./HasilAnalisaCard";
import { AmortisasiTable } from "./AmortisasiTable";

function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function analisa(result: KPRResult, hargaProperti: number) {
  const rasio = (result.angsuranBulanan / (hargaProperti * 0.003)) * 100;
  if (rasio <= 30) {
    return {
      status: "baik" as const,
      badge: "Cicilan Ringan",
      judul: "Simulasi KPR terlihat sangat layak.",
      narasi: `Angsuran bulanan Rp ${(result.angsuranBulanan / 1_000_000).toFixed(1)}jt dengan tenor ${Math.round(result.amortisasi.length / 12)} tahun. Suku bunga stabil akan membuat cicilan ini terjangkau.`,
      actionItems: [
        "Bandingkan penawaran minimal 3 bank — perbedaan 0.5% sangat berarti jangka panjang",
        "Siapkan dana darurat minimal 6 bulan pengeluaran terpisah dari DP",
        "Perhatikan bunga fixed vs floating dan siapkan skenario jika bunga naik",
        "Siapkan dokumen: KTP, KK, slip gaji 3 bulan, rekening koran 3–6 bulan, NPWP",
      ],
    };
  } else if (rasio <= 40) {
    return {
      status: "sedang" as const,
      badge: "Perlu Perhatian",
      judul: "Simulasi masih dalam batas, namun perlu perhitungan matang.",
      narasi: `Total bunga yang dibayar mencapai ${fmtRp(result.totalBunga)}. Pastikan pendapatan stabil dan ada buffer untuk kebutuhan darurat.`,
      actionItems: [
        "Pertimbangkan DP lebih besar untuk mengurangi cicilan bulanan",
        "Cari bank dengan suku bunga kompetitif — simulasikan perbedaan 1–2%",
        "Pastikan tidak ada cicilan lain yang membebani cashflow",
      ],
    };
  } else {
    return {
      status: "buruk" as const,
      badge: "Cicilan Berat",
      judul: "Simulasi menunjukkan cicilan yang memberatkan.",
      narasi: `Total pembayaran ${fmtRp(result.totalPembayaran)} jauh melebihi harga properti. Pertimbangkan DP lebih besar atau tenor lebih pendek.`,
      actionItems: [
        "Naikkan uang muka untuk mengurangi pokok pinjaman",
        "Perpanjang tenor untuk cicilan lebih kecil",
        "Tunggu hingga pendapatan meningkat sebelum mengajukan KPR",
      ],
    };
  }
}

export function KprCalculator() {
  const [hargaProperti, setHargaProperti] = useState(500_000_000);
  const [persenDP, setPersenDP] = useState(20);
  const [sukuBunga, setSukuBunga] = useState(10);
  const [tenor, setTenor] = useState(20);
  const [result, setResult] = useState<KPRResult | null>(null);
  const [showAmort, setShowAmort] = useState(false);

  function hitung() {
    const r = hitungKPR({
      hargaProperti,
      persenDP,
      sukuBungaTahunan: sukuBunga,
      tenorTahun: tenor,
    });
    setResult(r);
    setShowAmort(false);
  }

  function reset() {
    setResult(null);
  }

  const analisaData = result ? analisa(result, hargaProperti) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber
            label="Harga Properti"
            value={hargaProperti}
            onChange={setHargaProperti}
            prefix="Rp"
            min={100_000_000}
            step={10_000_000}
          />
          <InputSlider
            label="Uang Muka"
            value={persenDP}
            onChange={setPersenDP}
            min={10}
            max={50}
            step={1}
            formatValue={(v) => `${v}%`}
          />
          <InputSlider
            label="Suku Bunga KPR"
            value={sukuBunga}
            onChange={setSukuBunga}
            min={5}
            max={20}
            step={0.5}
            formatValue={(v) => `${v}% per tahun`}
          />
          <InputSlider
            label="Tenor"
            value={tenor}
            onChange={setTenor}
            min={5}
            max={30}
            step={1}
            formatValue={(v) => `${v} tahun`}
          />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung & Analisa
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Hasil Kalkulasi
          </p>

          <ResultCard
            label="Angsuran Bulanan"
            value={fmtRp(result.angsuranBulanan)}
            size="lg"
            color="emerald"
            highlight
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <ResultCard label="Uang Muka" value={fmtRp(result.uangMuka)} />
            <ResultCard label="Pokok Pinjaman" value={fmtRp(result.pokokPinjaman)} />
            <ResultCard label="Total Bunga" value={fmtRp(result.totalBunga)} color="amber" />
            <ResultCard label="Total Pembayaran" value={fmtRp(result.totalPembayaran)} />
          </div>

          {analisaData && (
            <>
              <p
                className="text-center text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Hasil Analisa
              </p>
              <HasilAnalisaCard
                status={analisaData.status}
                badge={analisaData.badge}
                judul={analisaData.judul}
                narasi={analisaData.narasi}
                actionItems={analisaData.actionItems}
              />
            </>
          )}

          <button
            onClick={() => setShowAmort(!showAmort)}
            className="w-full rounded-lg border py-3 text-sm font-medium transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            {showAmort ? "Sembunyikan Tabel Amortisasi" : "Lihat Tabel Amortisasi"}
          </button>

          {showAmort && <AmortisasiTable data={result.amortisasi} />}

          <button
            onClick={reset}
            className="w-full rounded-xl border py-3.5 text-sm font-semibold transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-primary)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            Ubah Input &amp; Hitung Ulang
          </button>
        </div>
      )}
    </div>
  );
}
