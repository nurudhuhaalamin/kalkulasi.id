import type { Tool } from "@/lib/validators/tool-validator";
import { KprCalculator } from "@/components/calculators/KprCalculator";
import { DcaCalculator } from "@/components/calculators/DcaCalculator";
import { UntungRugiCalculator } from "@/components/calculators/UntungRugiCalculator";
import { PositionSizingCalculator } from "@/components/calculators/PositionSizingCalculator";
import { PPh21Calculator } from "@/components/calculators/PPh21Calculator";
import { DanaDaruratCalculator } from "@/components/calculators/DanaDaruratCalculator";
import { BreakEvenCalculator } from "@/components/calculators/BreakEvenCalculator";
import { BungaMajemukCalculator } from "@/components/calculators/BungaMajemukCalculator";

const CALCULATOR_MAP: Record<string, React.ComponentType> = {
  "kalkulator-kpr": KprCalculator,
  "kalkulator-dca": DcaCalculator,
  "kalkulator-untung-rugi": UntungRugiCalculator,
  "kalkulator-position-sizing": PositionSizingCalculator,
  "kalkulator-pph-21": PPh21Calculator,
  "kalkulator-dana-darurat": DanaDaruratCalculator,
  "kalkulator-break-even": BreakEvenCalculator,
  "kalkulator-bunga-majemuk": BungaMajemukCalculator,
};

interface Props {
  tool: Tool;
}

export function ToolClientWrapper({ tool }: Props) {
  const Calculator = CALCULATOR_MAP[tool.slug];

  if (Calculator) {
    return <Calculator />;
  }

  return (
    <div
      className="rounded-2xl border-2 border-dashed p-10 text-center"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
    >
      <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
        {tool.nama}
      </p>
      <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
        Kalkulator ini sedang dalam pengembangan.
      </p>
    </div>
  );
}
