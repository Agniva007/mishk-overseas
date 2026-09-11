import { cn } from "@/lib/utils";

/**
 * Motif 3 — Compass rose.
 * An 8-point rose used as a low-opacity watermark bleeding off the top-right
 * of the hero and the bottom-right of the footer. Never interactive.
 */
export function CompassRose({
  className,
  showCardinals = true,
}: {
  className?: string;
  showCardinals?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
      >
        {/* Rings */}
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="62" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="26" />

        {/* Degree ticks every 15°, longer on the cardinals */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const long = i % 6 === 0;
          const r1 = long ? 78 : 83;
          return (
            <line
              key={i}
              x1={100 + Math.sin(angle) * r1}
              y1={100 - Math.cos(angle) * r1}
              x2={100 + Math.sin(angle) * 88}
              y2={100 - Math.cos(angle) * 88}
              strokeWidth={long ? 1.25 : 0.75}
            />
          );
        })}

        {/* Intercardinal star (NE/SE/SW/NW), shorter */}
        <path
          d="M100 38 L108 92 L162 100 L108 108 L100 162 L92 108 L38 100 L92 92 Z"
          transform="rotate(45 100 100)"
        />

        {/* Cardinal star (N/E/S/W), full length */}
        <path d="M100 12 L110 90 L188 100 L110 110 L100 188 L90 110 L12 100 L90 90 Z" />

        {/* North point filled, so the rose reads as oriented */}
        <path d="M100 12 L110 90 L100 100 Z" fill="currentColor" opacity="0.55" />
      </g>

      {showCardinals && (
        <g
          fill="currentColor"
          fontSize="11"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          <text x="100" y="8">N</text>
          <text x="196" y="104">E</text>
          <text x="100" y="200">S</text>
          <text x="4" y="104">W</text>
        </g>
      )}
    </svg>
  );
}
