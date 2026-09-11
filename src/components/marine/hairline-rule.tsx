import { cn } from "@/lib/utils";

/** The 6px brass terminal cap. Module-scope so it isn't redefined per render. */
function Square() {
  return <span className="size-1.5 shrink-0 bg-brass-500" />;
}

/**
 * Motif 1 — Hairline rule with a brass terminal.
 * A 1px rule that ends in a 6px brass square. Evokes a chart's scale bar.
 * Used as a section divider and as an under-headline accent.
 *
 * `align` positions the whole unit; the square always sits at the rule's end.
 * `terminal="both"` caps both ends, for centred section dividers.
 */
export function HairlineRule({
  className,
  width = "w-24",
  align = "left",
  terminal = "end",
}: {
  className?: string;
  width?: string;
  align?: "left" | "center" | "right";
  terminal?: "end" | "start" | "both";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className,
      )}
    >
      {(terminal === "start" || terminal === "both") && <Square />}
      <span className={cn("h-px bg-cream-50/20", width)} />
      {(terminal === "end" || terminal === "both") && <Square />}
    </span>
  );
}
