"use client";

import { useState } from "react";
import { hitungPPh21, type PPh21Result, type StatusPTKP } from "@/lib/calculators/perpajakan";
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

const PTKP_OPTIONS: { value: StatusPTKP; label: string }[] = [
  { value: "TK/0", label: "TK/0 — Belum kawin, tidak ada tanggungan" },
  { value: "TK/1", label: "TK/1 — Belum kawin, 1 tanggungan" },
  { value: "TK/2", label: "TK/2 — Belum kawin, 2 tanggungan" },
  { value: "TK/3", label: "TK/3 — Belum kawin, 3 tanggungan" },
  { value: "K/0", label: "K/0 — Kawin, tidak ada tanggungan" },
  { value: "K/1", label: "K/1 — Kawin, 1 tanggungan" },
  { value: "K/2", label: "K/2 — Kawin, 2 tanggungan" },
  { value: "K/3", label: "K/3 — Kawin, 3 tanggungan" },
];

function analisa(r: PPh21Result, gajiBruto: number) {
  const efektivePersen = (r.pphTerutangBulanan / gajiBruto) * 100;
  if (efektivePersen < 5) {
    return {
      status: "baik" as const,
      badge: "Pajak Ringan",
      judul: `Tarif pajak efektif ${efektivePersen.toFixed(1)}% — tergolong ringan`,
      narasi: `Take home pay kamu ${fmtRp(r.takeHomePay)}/bulan. PKP tahunan ${fmtRp(r.pkp)} masih di lapisan tarif bawah.`,
      actionItems: [
        "Manfaatkan biaya jabatan 5% (max Rp 500rb/bulan) untuk kurangi PKP",
        "Ikut BPJS Ketenagakerjaan — iurannya bisa mengurangi PKP",
        "Donasi ke lembaga resmi bisa jadi pengurang pajak",
      ],
    };
  } else if (efektivePersen < 15) {
    return {
      status: "sedang" as const,
      badge: "Pajak Moderat",
      judul: `Tarif efektif ${efektivePersen.toFixed(1)}% — moderat`,
      narasi: `PPh 21 bulanan ${fmtRp(r.pphTerutangBulanan)} atau ${fmtRp(r.pphTerutangTahunan)}/tahun. Pastikan perhitungan sudah benar dengan slip gaji.`,
      actionItems: [
        "Pastikan biaya jabatan sudah diperhitungkan dengan benar",
        "Cek apakah ada tunjangan yang bisa dioptimalkan secara pajak",
      ],
    };
  } else {
    return {
      status: "buruk" as const,
      badge: "Pajak Tinggi",
      judul: `Tarif efektif ${efektivePersen.toFixed(1)}% — konsultasikan dengan tax consultant`,
      narasi: `Dengan PKP ${fmtRp(r.pkp)}, sebagian penghasilan kena tarif 25–30%. Pertimbangkan perencanaan pajak yang lebih optimal.`,
      actionItems: [
        "Konsultasikan dengan konsultan pajak untuk perencanaan yang lebih efisien",
        "Pertimbangkan investasi yang memiliki insentif pajak (reksa dana, dll)",
      ],
    };
  }
}

export function PPh21Calculator() {
  const [gajiBruto, setGajiBruto] = useState(10_000_000);
  const [statusPTKP, setStatusPTKP] = useState<StatusPTKP>("TK/0");
  const [bpjsKesehatan, setBpjsKesehatan] = useState(100_000);
  const [bpjsNaker, setBpjsNaker] = useState(20_000);
  const [result, setResult] = useState<PPh21Result | null>(null);

  function hitung() {
    setResult(
      hitungPPh21({
        gajiBrutoPerBulan: gajiBruto,
        statusPTKP,
        biayaJabatanPersen: 5,
        iuranBPJSKesehatanKaryawan: bpjsKesehatan,
        iuranBPJSTenagaKerjaBulanan: bpjsNaker,
      })
    );
  }

  const analisaData = result ? analisa(result, gajiBruto) : null;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {!result ? (
        <div className="space-y-5">
          <InputNumber label="Gaji Bruto per Bulan" value={gajiBruto} onChange={setGajiBruto} prefix="Rp" min={0} step={500_000} />
          <InputSelect
            label="Status PTKP"
            value={statusPTKP}
            onChange={(v) => setStatusPTKP(v as StatusPTKP)}
            options={PTKP_OPTIONS}
          />
          <InputNumber label="Iuran BPJS Kesehatan (Karyawan)" value={bpjsKesehatan} onChange={setBpjsKesehatan} prefix="Rp" min={0} step={10_000} />
          <InputNumber label="Iuran BPJS Naker (Karyawan)" value={bpjsNaker} onChange={setBpjsNaker} prefix="Rp" min={0} step={5_000} />
          <button
            onClick={hitung}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Hitung PPh 21
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <ResultCard label="Take Home Pay" value={fmtRp(result.takeHomePay)} size="lg" color="emerald" highlight />
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="PPh 21/Bulan" value={fmtRp(result.pphTerutangBulanan)} color="red" />
            <ResultCard label="PPh 21/Tahun" value={fmtRp(result.pphTerutangTahunan)} color="red" />
            <ResultCard label="PKP Tahunan" value={fmtRp(result.pkp)} />
            <ResultCard label="PTKP" value={fmtRp(result.ptkp)} />
          </div>

          {/* Lapisan Tarif */}
          {result.lapisanPajak.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Lapisan Tarif Progresif
              </p>
              <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                      {["Lapisan", "PKP di Lapisan", "Tarif", "Pajak"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.lapisanPajak.map((l, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border)", backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)" }}>
                        <td className="px-3 py-2 text-xs" style={{ color: "var(--text-secondary)" }}>{l.lapisan}</td>
                        <td className="px-3 py-2 tabular-nums text-xs" style={{ color: "var(--text-primary)" }}>{new Intl.NumberFormat("id-ID").format(l.pkpLapisan)}</td>
                        <td className="px-3 py-2 text-xs font-medium" style={{ color: "var(--orange)" }}>{l.tarif}%</td>
                        <td className="px-3 py-2 tabular-nums text-xs font-semibold" style={{ color: "var(--red)" }}>{new Intl.NumberFormat("id-ID").format(l.pajak)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
