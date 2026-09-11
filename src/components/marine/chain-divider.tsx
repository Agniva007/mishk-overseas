import { cn } from "@/lib/utils";

/**
 * Motif 4 — Rope/chain divider.
 * A repeating anchor-chain link pattern. Hard rule: once per page, maximum —
 * it sits between the trust band and the footer.
 */
export function ChainDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full overflow-hidden text-brass-500/35", className)}
    >
      <svg
        viewBox="0 0 96 24"
        preserveAspectRatio="xMidYMid slice"
        className="h-6 w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <defs>
          {/* One link + its perpendicular neighbour, tiled horizontally. */}
          <pattern
            id="chain-link"
            x="0"
            y="0"
            width="48"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <ellipse cx="12" cy="12" rx="11" ry="6.5" />
            <line x1="12" y1="5.5" x2="12" y2="18.5" strokeWidth="0.75" />
            <ellipse cx="36" cy="12" rx="11" ry="6.5" />
            <line x1="36" y1="5.5" x2="36" y2="18.5" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="96" height="24" fill="url(#chain-link)" stroke="none" />
      </svg>
    </div>
  );
}
