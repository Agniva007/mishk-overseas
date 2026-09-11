import { cn } from "@/lib/utils";

/**
 * Motif 8 — Grid-on-navy texture.
 * A 48px nautical-chart grid at 3% opacity behind dark sections, masked to
 * fade out toward the bottom. Gives flat navy some tooth.
 */
export function ChartGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("chart-grid pointer-events-none absolute inset-0", className)}
    />
  );
}
