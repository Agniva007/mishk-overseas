import { cn } from "@/lib/utils";

/**
 * Motif 5 — Wave-cut section edge.
 * A very shallow (24px amplitude) wave on the transition between a navy and a
 * paper section. Subtle by design: it should be noticed only on second look.
 *
 * `fill` is the colour of the section being entered.
 * `flip` inverts it for the paper → navy transition.
 */
export function WaveEdge({
  className,
  fill = "text-paper-50",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full leading-none",
        fill,
        flip && "rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        className="block h-6 w-full"
        fill="currentColor"
      >
        <path d="M0 24 L0 12 C 180 0, 360 24, 540 14 C 720 4, 900 22, 1080 16 C 1230 11, 1350 2, 1440 8 L1440 24 Z" />
      </svg>
    </div>
  );
}
