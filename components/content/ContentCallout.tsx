import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

type CalloutType = "info" | "warning" | "success";

interface ContentCalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-800",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-amber-50 border-amber-200 text-amber-800",
    iconClassName: "text-amber-500",
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-800",
    iconClassName: "text-green-500",
  },
};

export function ContentCallout({ type = "info", children }: ContentCalloutProps) {
  const { icon: Icon, className, iconClassName } = calloutConfig[type];

  return (
    <div className={clsx("flex gap-3 rounded-lg border p-4 text-sm", className)}>
      <Icon className={clsx("h-5 w-5 flex-shrink-0 mt-0.5", iconClassName)} />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
