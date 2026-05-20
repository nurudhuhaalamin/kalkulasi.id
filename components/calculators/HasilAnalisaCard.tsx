"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Status = "baik" | "sedang" | "buruk";

interface Props {
  status: Status;
  judul: string;
  narasi: string;
  actionItems?: string[];
  badge?: string;
}

const statusConfig: Record<
  Status,
  { icon: React.ElementType; borderColor: string; iconColor: string; badgeBg: string; badgeText: string }
> = {
  baik: {
    icon: CheckCircle2,
    borderColor: "var(--accent)",
    iconColor: "var(--accent)",
    badgeBg: "var(--accent-dim)",
    badgeText: "var(--accent)",
  },
  sedang: {
    icon: AlertTriangle,
    borderColor: "var(--amber)",
    iconColor: "var(--amber)",
    badgeBg: "var(--amber-dim)",
    badgeText: "var(--amber)",
  },
  buruk: {
    icon: XCircle,
    borderColor: "var(--red)",
    iconColor: "var(--red)",
    badgeBg: "var(--red-dim)",
    badgeText: "var(--red)",
  },
};

export function HasilAnalisaCard({ status, judul, narasi, actionItems, badge }: Props) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <div
      className="rounded-xl border-l-4 p-5"
      style={{
        borderLeftColor: cfg.borderColor,
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color: cfg.iconColor }} />
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            Hasil Analisa
          </span>
        </div>
        {badge && (
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeText }}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="mb-2 font-semibold leading-snug" style={{ color: cfg.iconColor }}>
        {judul}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {narasi}
      </p>

      {actionItems && actionItems.length > 0 && (
        <div className="mt-4">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Yang Bisa Kamu Lakukan
          </p>
          <ul className="space-y-1.5">
            {actionItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="mt-0.5 flex-shrink-0 font-bold"
                  style={{ color: cfg.iconColor }}
                >
                  &rsaquo;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
