import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  deltaLabel,
  deltaDirection = "up",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  deltaLabel?: string;
  deltaDirection?: "up" | "down";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      {deltaLabel && (
        <p
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium"
          style={{ color: deltaDirection === "up" ? "#0a6b0a" : "#b42323" }}
        >
          {deltaDirection === "up" ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          )}
          {deltaLabel}
        </p>
      )}
    </div>
  );
}
