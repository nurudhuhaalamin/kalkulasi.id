import { clsx } from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={clsx("rounded-xl border border-gray-200 bg-white p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={clsx("mb-4 space-y-1", className)}>{children}</div>
  );
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={clsx("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={clsx("", className)}>{children}</div>;
}
