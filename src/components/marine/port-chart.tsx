import { coastline, ports } from "@/data/ports";

/**
 * Nautical chart plot of the ports served. Shared by the homepage section and
 * the /ports index.
 */
/* --- Projection ---------------------------------------------------------- */
/* Plain equirectangular over the Arabian Sea → Bay of Bengal window. Real
   coordinates in, chart coordinates out — no invented cartography. */

const LNG = { min: 53, max: 91 };
const LAT = { min: 6, max: 28 };
const W = 760;
const H = Math.round((W * (LAT.max - LAT.min)) / (LNG.max - LNG.min));

/* Rounded to 1dp — raw floats emit noise like 99.39999999999998 into the DOM. */
const x = (lng: number) => +(((lng - LNG.min) / (LNG.max - LNG.min)) * W).toFixed(1);
const y = (lat: number) => +(((LAT.max - lat) / (LAT.max - LAT.min)) * H).toFixed(1);

const MERIDIANS = [55, 60, 65, 70, 75, 80, 85, 90];
const PARALLELS = [10, 15, 20, 25];

export function PortChart() {
  const coastPath = coastline
    .map(([lat, lng], i) => `${i ? "L" : "M"}${x(lng)} ${y(lat)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Chart plot of the ports served across the Indian coast and the Gulf. The full list follows."
    >
      {/* --- Graticule ------------------------------------------------- */}
      <g stroke="var(--color-cream-50)" strokeOpacity="0.07" strokeWidth="1">
        {MERIDIANS.map((m) => (
          <line key={m} x1={x(m)} y1={0} x2={x(m)} y2={H} />
        ))}
        {PARALLELS.map((p) => (
          <line key={p} x1={0} y1={y(p)} x2={W} y2={y(p)} />
        ))}
      </g>

      {/* --- Graticule labels ------------------------------------------- */}
      <g
        fill="var(--color-slate-400)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        opacity="0.75"
      >
        {MERIDIANS.map((m) => (
          <text key={m} x={x(m) + 4} y={H - 6}>
            {m}°E
          </text>
        ))}
        {PARALLELS.map((p) => (
          <text key={p} x={4} y={y(p) - 5}>
            {p}°N
          </text>
        ))}
      </g>

      {/* --- Coastline --------------------------------------------------- */}
      <path
        d={coastPath}
        fill="none"
        stroke="var(--color-teal-500)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* --- Ports ------------------------------------------------------- */}
      {ports.map((port) => (
        <g key={port.slug} className="group">
          <title>{`${port.name} (${port.locode})`}</title>

          {/* Halo on active ports */}
          {port.active && (
            <circle
              cx={x(port.lng)}
              cy={y(port.lat)}
              r="9"
              fill="var(--color-brass-500)"
              fillOpacity="0.14"
              className="transition-opacity duration-200 group-hover:opacity-60"
            />
          )}

          <circle
            cx={x(port.lng)}
            cy={y(port.lat)}
            r={port.active ? 4 : 3}
            fill={port.active ? "var(--color-brass-500)" : "transparent"}
            stroke={port.active ? "none" : "var(--color-slate-400)"}
            strokeWidth="1.25"
            className="transition-[fill] duration-200 group-hover:fill-brass-400"
          />

          <text
            x={x(port.lng) + 9}
            y={y(port.lat) + 3.5}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--color-cream-50)"
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            {port.locode}
          </text>
        </g>
      ))}
    </svg>
  );
}
