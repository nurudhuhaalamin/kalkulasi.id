"use client";

type Color = "emerald" | "red" | "amber" | "default";

interface Props {
  label: string;
  value: string;
  subLabel?: string;
  size?: "sm" | "lg";
  color?: Color;
  highlight?: boolean;
}

const colorMap: Record<Color, { text: string; bg: string }> = {
  emerald: { text: "var(--accent)", bg: "var(--accent-dim)" },
  red: { text: "var(--red)", bg: "var(--red-dim)" },
  amber: { text: "var(--amber)", bg: "var(--amber-dim)" },
  default: { text: "var(--text-primary)", bg: "transparent" },
};

export function ResultCard({
  label,
  value,
  subLabel,
  size = "sm",
  color = "default",
  highlight = false,
}: Props) {
  const c = colorMap[color];

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        backgroundColor: highlight ? c.bg : "var(--bg-card)",
        borderColor: highlight ? c.text : "var(--border)",
      }}
    >
      <p
        className="mb-1 text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
      <p
        className={`font-bold tabular-nums ${size === "lg" ? "text-3xl sm:text-4xl" : "text-xl"}`}
        style={{ color: c.text }}
      >
        {value}
      </p>
      {subLabel && (
        <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
          {subLabel}
        </p>
      )}
    </div>
  );
}
