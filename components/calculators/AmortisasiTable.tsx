"use client";

import { useState } from "react";
import type { AmortisasiRow } from "@/lib/calculators/properti";

function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

interface Props {
  data: AmortisasiRow[];
}

const PAGE = 12;

export function AmortisasiTable({ data }: Props) {
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? data : data.slice(0, PAGE);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
              {["Bulan", "Angsuran", "Pokok", "Bunga", "Sisa Pinjaman"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.bulanKe}
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <td className="px-4 py-2.5 font-medium tabular-nums" style={{ color: "var(--text-primary)" }}>
                  {row.bulanKe}
                </td>
                <td className="px-4 py-2.5 tabular-nums" style={{ color: "var(--text-primary)" }}>
                  {fmtRp(row.angsuran)}
                </td>
                <td className="px-4 py-2.5 tabular-nums" style={{ color: "var(--accent)" }}>
                  {fmtRp(row.pokok)}
                </td>
                <td className="px-4 py-2.5 tabular-nums" style={{ color: "var(--orange)" }}>
                  {fmtRp(row.bunga)}
                </td>
                <td className="px-4 py-2.5 tabular-nums" style={{ color: "var(--text-secondary)" }}>
                  {fmtRp(row.sisaPinjaman)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > PAGE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 w-full rounded-lg border py-2.5 text-sm font-medium transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          {showAll ? "Sembunyikan" : `Lihat Semua ${data.length} Bulan`}
        </button>
      )}
    </div>
  );
}
