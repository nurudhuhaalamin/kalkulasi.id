"use client";

interface Props {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
}

export function InputNumber({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
  placeholder,
}: Props) {
  return (
    <div className="space-y-1.5">
      <label
        className="block text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
        {suffix && ` (${suffix})`}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span
            className="pointer-events-none absolute left-3 text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(v);
          }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="w-full rounded-lg border py-3 text-sm font-medium outline-none transition-all focus:ring-2"
          style={{
            paddingLeft: prefix ? "2.75rem" : "0.875rem",
            paddingRight: suffix ? "3.5rem" : "0.875rem",
            backgroundColor: "var(--bg-input)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 2px var(--accent-dim)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {suffix && !prefix && (
          <span
            className="pointer-events-none absolute right-3 text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
