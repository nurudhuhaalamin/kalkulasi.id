"use client";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
}

export function InputSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue,
}: Props) {
  const display = formatValue ? formatValue(value) : String(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </label>
        <span
          className="rounded-md px-2 py-0.5 text-sm font-bold tabular-nums"
          style={{
            backgroundColor: "var(--accent-dim)",
            color: "var(--accent)",
          }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full"
        style={{ accentColor: "var(--accent)" }}
      />
      <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
