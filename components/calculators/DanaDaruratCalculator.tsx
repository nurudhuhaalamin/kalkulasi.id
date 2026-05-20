"use client";

import { useState } from "react";
import { hitungDanaDarurat, type DanaDaruratResult, type StatusPekerjaan } from "@/lib/calculators/keuangan-pribadi";
import { InputNumber } from "./InputNumber";
import { InputSelect } from "./InputSelect";
import { ResultCard } from "./ResultCard";
import { HasilAnalisaCard } from "./HasilAnalisaCard";

function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

const STATUS_OPTIONS: { value: StatusPekerjaan; label: string }[] = [
  { value: "karyawan-tetap", label: "Karyawan Tetap" },
  { value: "freelancer", label: "Freelancer / Pekerja Lepas" },
  { value: "wirausaha", label: "Wirausaha / Self-employed" },
  { value: "lainnya", label: "Lainnya" },
];

function analisa(r: DanaDaruratResult, danaSaatIni: number) {
  const progress = danaSaatIni > 0 ? (danaSaatIni / r.targetRekomendasi) * 100 : 0;
  if (danaSaatIni >= r.targetRekomendasi) {
    return {
      status: "baik" as const,
      badge: "Dana Aman",
      judul: "Dana darurat kamu sudah mencukupi!",
      narasi: `${r.alasanRekomendasi} Dana kamu ${fmtRp(danaSaatIni)} sudah melampaui target ${r.rekomendasiBulan} bulan.`,
      actionItems: [
        "Pertahankan dana darurat di instrumen likuid: tabungan, deposito, reksa dana pasar uang",
        "Review dana darurat setiap 6 bulan sesuai perubahan pengeluaran",
        "Kelebihan dana bisa dialihkan ke investasi",
      ],
    };
  } else if (progress >= 50) {
    return {
      status: "sedang" as const,
      badge: "Dalam Proses",
      judul: `Sudah ${Math.round(progress)}% dari target — terus konsisten!`,
      narasi: `${r.alasanRekomendasi} Kamu masih butuh ${fmtRp(r.targetRekomendasi - danaSaatIni)} lagi untuk mencapai target.`,
      actionItems: [
        "Sisihkan minimal 10% gaji setiap bulan untuk dana darurat",
        "Simpan di reksa dana pasar uang untuk return lebih baik dari tabungan biasa",
      ],
    };
  } else {
    return {
      status: "buruk" as const,
      badge: "Perlu Perhatian",
      judul: "Dana darurat belum memadai — prioritaskan ini",
      narasi: `${r.alasanRekomendasi} Dana darurat adalah fondasi keuangan. Tanpanya, keadaan darurat bisa memaksamu berutang.`,
      actionItems: [
        "Mulai sisihkan minimal Rp 500rb/bulan khusus untuk dana darurat",
        "Pisahkan rekening dana darurat dari rekening sehari-hari",
        "Tunda investasi berisiko hingga dana darurat minimal 3 bulan tercapai",
        "Simpan di instrumen yang mudah dicairkan: tabungan atau reksa dana pasar uang",
      ],
    };
  }
}

export function DanaDaruratCalculator() {
  const [pengeluaran, setPengeluaran] = useState(5_000_000);
  const [statusPekerjaan, setStatusPekerjaan] = useState<StatusPekerjaan>("karyawan-tetap");
  const [tanggungan, setTanggungan] = useState(0);
  const [danaSaatIni, setDanaSaatIni] = useState(0);
  const [result, setResult] = useState<DanaDaruratResult | null>(null);

  function hitung() {
    setResult(hitungDanaDarurat({ pengeluaranBulanan: pengeluaran, statusPekerjaan, jumlahTanggungan: tanggungan }));
  }

  const analisaData = result ? analisa(result, danaSaatIni) : null;
  const progress = result && danaSaatIni > 0 ? Math.min(100, (danaSaatIni / result.targetRekomendasi) * 100) : 0;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Pengeluaran Bulanan" value={pengeluaran} onChange={setPengeluaran} prefix="Rp" min={0} step={500_000} />
          <InputSelect
            label="Status Pekerjaan"
            value={statusPekerjaan}
            onChange={(v) => setStatusPekerjaan(v as StatusPekerjaan)}
            options={STATUS_OPTIONS}
          />
          <InputSelect
            label="Jumlah Tanggungan"
            value={String(tanggungan)}
            onChange={(v) => setTanggungan(parseInt(v))}
            options={[
              { value: "0", label: "0 — Tidak ada tanggungan" },
              { value: "1", label: "1 tanggungan" },
              { value: "2", label: "2 tanggungan" },
              { value: "3", label: "3+ tanggungan" },
            ]}
          />
          <InputNumber label="Dana Darurat Saat Ini (opsional)" value={danaSaatIni} onChange={setDanaSaatIni} prefix="Rp" min={0} step={500_000} hint="Isi untuk melihat progress kamu" />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung Target Dana Darurat
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard
            label={`Target ${result.rekomendasiBulan} Bulan (Rekomendasi)`}
            value={fmtRp(result.targetRekomendasi)}
            size="lg"
            color="emerald"
            highlight
          />
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Target 3 Bulan" value={fmtRp(result.targetMinimal)} />
            <ResultCard label="Target 6 Bulan" value={fmtRp(result.targetDisarankan)} />
            <ResultCard label="Target 12 Bulan" value={fmtRp(result.targetMaksimal)} />
          </div>

          {danaSaatIni > 0 && (
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span style={{ color: "var(--text-muted)" }}>Progress Dana Darurat</span>
                <span className="font-semibold" style={{ color: "var(--accent)" }}>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-input)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }}
                />
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {fmtRp(danaSaatIni)} dari {fmtRp(result.targetRekomendasi)}
              </p>
            </div>
          )}

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
