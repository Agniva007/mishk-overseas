import { detailPorts, ports } from "@/data/ports";
import { landRings } from "@/data/world-outline";

/**
 * Nautical chart plot of the whole network — all ports, core and network.
 *
 * ARTISTIC INTENT: this is built as a chart, not an infographic. Mercator,
 * because that is the projection seamen actually plot on and because it makes
 * a rhumb line a straight line — so the portolan rose below is geometrically
 * honest rather than decorative. Real coastline (Natural Earth 110m), a
 * graticule with a ticked neatline, named ocean basins, the main trade lanes
 * as bowed dashed arcs, and the home waters lit from under the plot.
 *
 * Core ports (our own delivery) burn brass with a halo; network ports are
 * smaller teal rings. 148 real positions, no invented cartography.
 */

/* --- Projection ---------------------------------------------------------- */
/* Mercator over a window that holds every port with a clear margin from the
   neatline: Oakland at 122°W to Brisbane at 153°E, Aberdeen at 57°N to
   Melbourne at 38°S. The antimeridian falls outside it, which is why the
   coastline rings arrive pre-split and nothing streaks across the Pacific. */

const LNG = { min: -138, max: 168 };
const LAT = { min: -46, max: 66 };

const W = 1200;

/** Mercator northing, in radians of the unit sphere. */
const mercator = (lat: number) =>
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

const Y0 = mercator(LAT.max);
const Y1 = mercator(LAT.min);
const H = Math.round((W * (Y0 - Y1) * 180) / ((LNG.max - LNG.min) * Math.PI));

/* Rounded to 1dp — raw floats emit noise like 99.39999999999998 into the DOM. */
const x = (lng: number) =>
  +(((lng - LNG.min) / (LNG.max - LNG.min)) * W).toFixed(1);
const y = (lat: number) => +(((Y0 - mercator(lat)) / (Y0 - Y1)) * H).toFixed(1);

const MERIDIANS = [-120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
const PARALLELS = [60, 40, 20, 0, -20, -40];

/** Ticks on the neatline, finer than the graticule — the chart-border look. */
const LNG_TICKS = Array.from({ length: 31 }, (_, i) => -130 + i * 10);
const LAT_TICKS = Array.from({ length: 23 }, (_, i) => 60 - i * 5);

const degLabel = (v: number, pos: string, neg: string) =>
  v === 0 ? "0°" : `${Math.abs(v)}°${v > 0 ? pos : neg}`;

/* --- Portolan rhumb roses ------------------------------------------------ */
/* A loxodrome is straight under Mercator, so these 32-point fans are the real
   thing: a bearing held from the rose centre. Centres sit in open water. */

const ROSES: { lat: number; lng: number; rays: number }[] = [
  { lat: -8, lng: 76, rays: 32 },  // Indian Ocean — home waters
  { lat: 22, lng: -38, rays: 16 }, // North Atlantic
];

const RAY_LENGTH = 1800;

/* --- Trade lanes --------------------------------------------------------- */
/* [from, to, bow] — bow is the perpendicular offset of the bezier control
   point in chart units, signed, tuned by eye so a lane bends around land
   rather than through it. */

const LANES: [string, string, number][] = [
  ["mundra", "jebel-ali", -14],
  ["mundra", "singapore", 34],
  ["singapore", "hong-kong", -18],
  ["hong-kong", "shanghai", -10],
  ["shanghai", "yokohama", -12],
  ["singapore", "fremantle", 26],
  ["fremantle", "melbourne", 40],
  ["mundra", "durban", 46],
  ["cape-town", "lagos-apapa", -44],
  ["jeddah", "port-said", -8],
  ["port-said", "algeciras", 26],
  ["algeciras", "southampton", -30],
  ["gibraltar", "new-york", 44],
  ["new-york", "cristobal", -34],
  ["balboa", "los-angeles", -40],
];

const bySlug = new Map(ports.map((p) => [p.slug, p]));

const lanePath = ([from, to, bow]: [string, string, number]) => {
  const a = bySlug.get(from);
  const b = bySlug.get(to);
  if (!a || !b) return null;

  const [ax, ay] = [x(a.lng), y(a.lat)];
  const [bx, by] = [x(b.lng), y(b.lat)];
  const [mx, my] = [(ax + bx) / 2, (ay + by) / 2];

  /* Unit normal to the chord, scaled by the bow. */
  const len = Math.hypot(bx - ax, by - ay) || 1;
  const nx = -((by - ay) / len) * bow;
  const ny = ((bx - ax) / len) * bow;

  return `M${ax} ${ay} Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${bx} ${by}`;
};

/* --- Ocean names --------------------------------------------------------- */
/* Placed in open water, where they cannot collide with a port dot. Letter-
   spaced and faint, the way a chart sets water. */

const WATERS: { label: string; lat: number; lng: number; size?: number }[] = [
  { label: "North Atlantic Ocean", lat: 50, lng: -40 },
  { label: "South Atlantic Ocean", lat: -30, lng: -22 },
  { label: "Pacific Ocean", lat: -8, lng: -108, size: 15 },
  { label: "Indian Ocean", lat: -25, lng: 84, size: 15 },
  { label: "Mediterranean Sea", lat: 36.5, lng: 16, size: 9 },
  { label: "Philippine Sea", lat: 16, lng: 136, size: 9 },
  { label: "Gulf of Guinea", lat: -5, lng: 2, size: 9 },
];

export function WorldChart() {
  const landPath = landRings
    .map(
      (ring) =>
        ring
          .map(([lng, lat], i) => `${i ? "L" : "M"}${x(lng)} ${y(lat)}`)
          .join(" ") + "Z",
    )
    .join(" ");

  const network = ports.filter((p) => p.tier === "network");

  return (
    /* A world chart does not survive being squeezed to 375px — below the
       min-width it scrolls rather than becoming illegible. */
    <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[48rem]"
        role="img"
        aria-label={`Mercator chart of the ${ports.length} ports we serve worldwide. ${detailPorts.length} core ports on the Indian coasts and in the UAE are marked in brass; the remaining ${network.length} agent-served ports are marked in teal. The full list follows.`}
      >
        <defs>
          {/* Home waters — the Arabian Sea lit from under the plot, so the
              eye lands on the coasts we deliver to ourselves. */}
          <radialGradient id="wc-home" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--color-brass-500)" stopOpacity="0.16" />
            <stop offset="55%" stopColor="var(--color-brass-500)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--color-brass-500)" stopOpacity="0" />
          </radialGradient>

          {/* Everything is drawn long and clipped to the neatline. */}
          <clipPath id="wc-frame">
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>

        <g clipPath="url(#wc-frame)">
          <rect x="0" y="0" width={W} height={H} fill="var(--color-navy-900)" />

          <ellipse
            cx={x(66)}
            cy={y(16)}
            rx={W * 0.13}
            ry={H * 0.3}
            fill="url(#wc-home)"
          />

          {/* --- Rhumb-line roses ---------------------------------------- */}
          <g stroke="var(--color-teal-500)" strokeOpacity="0.16" strokeWidth="0.5">
            {ROSES.map((rose) => {
              const cx = x(rose.lng);
              const cy = y(rose.lat);
              return Array.from({ length: rose.rays }, (_, i) => {
                const a = (i * 2 * Math.PI) / rose.rays;
                return (
                  <line
                    key={`${rose.lng}-${i}`}
                    x1={cx}
                    y1={cy}
                    x2={+(cx + Math.sin(a) * RAY_LENGTH).toFixed(1)}
                    y2={+(cy - Math.cos(a) * RAY_LENGTH).toFixed(1)}
                  />
                );
              });
            })}
          </g>

          {/* --- Graticule ----------------------------------------------- */}
          <g stroke="var(--color-cream-50)" strokeOpacity="0.07" strokeWidth="1">
            {MERIDIANS.map((m) => (
              <line key={m} x1={x(m)} y1={0} x2={x(m)} y2={H} />
            ))}
            {PARALLELS.filter((p) => p !== 0).map((p) => (
              <line key={p} x1={0} y1={y(p)} x2={W} y2={y(p)} />
            ))}
          </g>

          {/* Equator solid, tropics dashed — the three lines a chart names. */}
          <g
            stroke="var(--color-teal-500)"
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
          >
            <line x1={0} y1={y(0)} x2={W} y2={y(0)} />
            <line x1={0} y1={y(23.44)} x2={W} y2={y(23.44)} strokeDasharray="5 6" />
            <line x1={0} y1={y(-23.44)} x2={W} y2={y(-23.44)} strokeDasharray="5 6" />
          </g>

          {/* --- Land ----------------------------------------------------- */}
          <path
            d={landPath}
            fill="var(--color-navy-800)"
            fillOpacity="0.92"
            stroke="var(--color-teal-500)"
            strokeOpacity="0.5"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* --- Ocean names ---------------------------------------------- */}
          <g
            fill="var(--color-cream-50)"
            fillOpacity="0.26"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            {WATERS.map((w) => (
              <text
                key={w.label}
                x={x(w.lng)}
                y={y(w.lat)}
                fontSize={w.size ?? 12}
                letterSpacing={(w.size ?? 12) * 0.22}
              >
                {w.label.toUpperCase()}
              </text>
            ))}
          </g>

          {/* --- Trade lanes ---------------------------------------------- */}
          <g
            fill="none"
            stroke="var(--color-brass-500)"
            strokeOpacity="0.34"
            strokeWidth="1"
            strokeDasharray="2 5"
            strokeLinecap="round"
          >
            {LANES.map((lane) => {
              const d = lanePath(lane);
              return d ? <path key={`${lane[0]}-${lane[1]}`} d={d} /> : null;
            })}
          </g>

          {/* --- Compass rose --------------------------------------------- */}
          {/* On the Atlantic rhumb node — where a portolan chart puts it. */}
          <CompassStar cx={x(-38)} cy={y(22)} r={30} />

          {/* --- Network ports -------------------------------------------- */}
          <g>
            {network.map((port) => (
              <g key={port.slug} className="group">
                <title>{`${port.name} (${port.locode}) — ${port.country}`}</title>
                <circle
                  cx={x(port.lng)}
                  cy={y(port.lat)}
                  r="6"
                  fill="transparent"
                />
                <circle
                  cx={x(port.lng)}
                  cy={y(port.lat)}
                  r="2.4"
                  fill="var(--color-navy-900)"
                  stroke="var(--color-teal-300)"
                  strokeWidth="1.1"
                  className="transition-[fill,stroke] duration-200 group-hover:fill-teal-300 group-hover:stroke-cream-50"
                />
                <text
                  x={x(port.lng) + 7}
                  y={y(port.lat) + 3.2}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-cream-50)"
                  className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  {port.locode}
                </text>
              </g>
            ))}
          </g>

          {/* --- Core ports ----------------------------------------------- */}
          <g>
            {detailPorts.map((port) => (
              <g key={port.slug} className="group">
                <title>{`${port.name} (${port.locode}) — own delivery`}</title>
                {port.active && (
                  <circle
                    cx={x(port.lng)}
                    cy={y(port.lat)}
                    r="7"
                    fill="var(--color-brass-500)"
                    fillOpacity="0.18"
                    className="transition-opacity duration-200 group-hover:opacity-70"
                  />
                )}
                <circle
                  cx={x(port.lng)}
                  cy={y(port.lat)}
                  r={port.active ? 3 : 2.4}
                  fill={port.active ? "var(--color-brass-500)" : "var(--color-navy-900)"}
                  stroke={port.active ? "none" : "var(--color-brass-500)"}
                  strokeWidth="1.1"
                  className="transition-[fill] duration-200 group-hover:fill-brass-400"
                />
                <text
                  x={x(port.lng) + 7}
                  y={y(port.lat) - 5}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-brass-400)"
                  className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  {port.locode}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* --- Neatline: ticked double border, drawn last so it sits on top */}
        <g stroke="var(--color-navy-600)" strokeWidth="1" fill="none">
          <rect x="0.5" y="0.5" width={W - 1} height={H - 1} />
          <rect x="7.5" y="7.5" width={W - 15} height={H - 15} strokeOpacity="0.6" />
        </g>
        <g stroke="var(--color-navy-600)" strokeWidth="1">
          {LNG_TICKS.map((m) => (
            <g key={`t${m}`}>
              <line x1={x(m)} y1={0} x2={x(m)} y2={m % 30 === 0 ? 7.5 : 4} />
              <line x1={x(m)} y1={H} x2={x(m)} y2={H - (m % 30 === 0 ? 7.5 : 4)} />
            </g>
          ))}
          {LAT_TICKS.map((p) => (
            <g key={`p${p}`}>
              <line x1={0} y1={y(p)} x2={p % 20 === 0 ? 7.5 : 4} y2={y(p)} />
              <line x1={W} y1={y(p)} x2={W - (p % 20 === 0 ? 7.5 : 4)} y2={y(p)} />
            </g>
          ))}
        </g>

        {/* --- Graticule labels, inside the neatline -------------------- */}
        <g
          fill="var(--color-slate-400)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          opacity="0.8"
        >
          {MERIDIANS.map((m) => (
            <text key={m} x={x(m) + 4} y={H - 14}>
              {degLabel(m, "E", "W")}
            </text>
          ))}
          {PARALLELS.map((p) => (
            <text key={p} x={14} y={y(p) - 5}>
              {degLabel(p, "N", "S")}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * Eight-point compass star. Four long cardinal arms, four short, a hairline
 * ring and a north label — the plain working rose, not a flourish.
 */
function CompassStar({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const arm = (i: number, length: number) => {
    const a = (i * Math.PI) / 4;
    const tipX = cx + Math.sin(a) * length;
    const tipY = cy - Math.cos(a) * length;
    const b = a + Math.PI / 2;
    const w = r * 0.12;
    return `M${cx + Math.sin(b) * w} ${cy - Math.cos(b) * w} L${tipX.toFixed(1)} ${tipY.toFixed(1)} L${cx - Math.sin(b) * w} ${cy + Math.cos(b) * w} Z`;
  };

  return (
    <g opacity="0.5">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-brass-500)"
        strokeOpacity="0.45"
        strokeWidth="0.75"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.42}
        fill="none"
        stroke="var(--color-brass-500)"
        strokeOpacity="0.3"
        strokeWidth="0.75"
      />
      {[1, 3, 5, 7].map((i) => (
        <path key={i} d={arm(i, r * 0.62)} fill="var(--color-brass-500)" fillOpacity="0.3" />
      ))}
      {[0, 2, 4, 6].map((i) => (
        <path key={i} d={arm(i, r)} fill="var(--color-brass-500)" fillOpacity="0.55" />
      ))}
      <text
        x={cx}
        y={cy - r - 5}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="var(--color-brass-500)"
        textAnchor="middle"
      >
        N
      </text>
    </g>
  );
}

/**
 * Key for the chart. HTML rather than an in-SVG cartouche: a cartouche scales
 * with the viewBox and turns to mush on a phone, and this has to stay
 * readable at every width.
 */
export function ChartLegend({ className }: { className?: string }) {
  const keys = [
    {
      mark: (
        <span className="relative flex size-3 items-center justify-center">
          <span className="absolute size-3 rounded-full bg-brass-500/25" />
          <span className="size-1.5 rounded-full bg-brass-500" />
        </span>
      ),
      label: "Own delivery",
      note: `${detailPorts.filter((p) => p.active).length} ports`,
    },
    {
      mark: (
        <span className="size-2 rounded-full border border-brass-500 bg-navy-900" />
      ),
      label: "Partner agent, our coast",
      note: `${detailPorts.filter((p) => !p.active).length} ports`,
    },
    {
      mark: (
        <span className="size-2 rounded-full border border-teal-300 bg-navy-900" />
      ),
      label: "Global agent network",
      note: `${ports.filter((p) => p.tier === "network").length} ports`,
    },
    {
      mark: (
        <span
          aria-hidden="true"
          className="h-px w-5 border-t border-dashed border-brass-500/60"
        />
      ),
      label: "Principal trade lanes",
      note: "indicative",
    },
  ];

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs ${className ?? ""}`}
    >
      {keys.map((k) => (
        <li key={k.label} className="flex items-center gap-2.5">
          {k.mark}
          <span className="text-cream-200">{k.label}</span>
          <span className="text-slate-400">{k.note}</span>
        </li>
      ))}
    </ul>
  );
}
