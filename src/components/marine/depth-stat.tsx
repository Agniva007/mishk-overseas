"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

/**
 * Motif 2 — Depth-sounding numeral.
 * A statistic in Fraunces over a brass em-dash rule, with a mono unit label
 * beneath. Reads like a depth annotation on a chart. Counts up on scroll.
 */
export function DepthStat({
  value,
  suffix = "",
  prefix = "",
  label,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <span
        ref={ref}
        className="font-display text-5xl font-semibold leading-none tracking-tight text-cream-50 tabular-nums sm:text-6xl"
      >
        {prefix}
        {current}
        <span className="text-brass-500">{suffix}</span>
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-brass-500" />
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>
    </div>
  );
}
