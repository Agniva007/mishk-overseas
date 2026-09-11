import { cn } from "@/lib/utils";

/**
 * Motif 7 — Plimsoll mark.
 * The load-line disc, used as the bullet glyph in feature lists and as the
 * basis for the favicon.
 */
export function PlimsollBullet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="7.25" />
      <line x1="2.5" y1="12" x2="21.5" y2="12" />
    </svg>
  );
}
