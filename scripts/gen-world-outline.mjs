/**
 * Generates src/data/world-outline.ts — the coastline behind the port chart.
 *
 *   curl -sfLO https://raw.githubusercontent.com/martynafford/\
 *     natural-earth-geojson/master/110m/physical/ne_110m_land.json
 *   npm run gen:world -- ne_110m_land.json
 *
 * Source data is Natural Earth 1:110m "land", public domain. Tune the output
 * with EPS (Douglas-Peucker tolerance, degrees) and MIN_EXTENT (the island
 * filter, degrees² of bounding box).
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = process.argv[2];
const geo = JSON.parse(readFileSync(SRC, "utf8"));

/* --- Window (must match the chart projection) --- */
const LNG = { min: -132, max: 172 };
const LAT = { min: -46, max: 66 };

/* --- Douglas-Peucker on lng/lat --- */
const perp = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay;
  const d2 = dx * dx + dy * dy;
  if (d2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / d2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};

const simplify = (pts, eps) => {
  if (pts.length < 3) return pts;
  let far = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perp(pts[i], pts[0], pts[pts.length - 1]);
    if (d > far) { far = d; idx = i; }
  }
  if (far <= eps) return [pts[0], pts[pts.length - 1]];
  return [
    ...simplify(pts.slice(0, idx + 1), eps).slice(0, -1),
    ...simplify(pts.slice(idx), eps),
  ];
};

/* --- Split a ring wherever it jumps the antimeridian --- */
const splitAtSeam = (ring) => {
  const parts = [[ring[0]]];
  for (let i = 1; i < ring.length; i++) {
    if (Math.abs(ring[i][0] - ring[i - 1][0]) > 180) parts.push([]);
    parts[parts.length - 1].push(ring[i]);
  }
  return parts.filter((p) => p.length > 2);
};

const bbox = (ring) => {
  let x0 = 180, x1 = -180, y0 = 90, y1 = -90;
  for (const [x, y] of ring) {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return { x0, x1, y0, y1 };
};

/* Rough ring extent in degrees² — the island filter. */
const extent = (r) => { const b = bbox(r); return (b.x1 - b.x0) * (b.y1 - b.y0); };

const EPS = Number(process.env.EPS ?? 0.45);
const MIN_EXTENT = Number(process.env.MIN_EXTENT ?? 2.0);

const rings = [];
for (const f of geo.features) {
  const g = f.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  for (const poly of polys) {
    /* Outer ring only — 110m holes are lakes, which a coastline silhouette
       does not want anyway. */
    const outer = poly[0];
    const b = bbox(outer);
    if (b.y1 < -56) continue;                      // Antarctica
    if (b.y0 > LAT.max + 8) continue;              // high Arctic, fully clipped
    if (b.y1 < LAT.min - 8) continue;
    for (const part of splitAtSeam(outer)) {
      if (extent(part) < MIN_EXTENT) continue;     // specks
      const s = simplify(part, EPS);
      if (s.length > 2) rings.push(s);
    }
  }
}

rings.sort((a, b) => extent(b) - extent(a));
const total = rings.reduce((n, r) => n + r.length, 0);

const body = rings
  .map((r) => "  [" + r.map(([x, y]) => `[${+x.toFixed(2)},${+y.toFixed(2)}]`).join(",") + "],")
  .join("\n");

writeFileSync(
  "src/data/world-outline.ts",
  `/**
 * World coastline for the port chart — ${rings.length} rings, ${total} vertices.
 *
 * GENERATED FILE. Do not hand-edit; re-run the generator instead.
 *
 * Source: Natural Earth 1:110m "land" (public domain, naturalearthdata.com),
 * via martynafford/natural-earth-geojson. Simplified with Douglas-Peucker at
 * ε=${EPS}° and filtered to rings larger than ${MIN_EXTENT}°² of bounding box, which
 * drops the specks that cost vertices and render as single pixels. Rings are
 * pre-split wherever they cross the antimeridian, so the chart never has to
 * draw a streak across the Pacific to close one.
 *
 * Trimmed to the chart window (lng ${LNG.min}…${LNG.max}, lat ${LAT.min}…${LAT.max}): Antarctica and the
 * high Arctic are absent because the chart clips them. Each ring is
 * [lng, lat] pairs at 2dp — about 1 km, far finer than the plot resolves.
 */

export const landRings: [number, number][][] = [
${body}
];
`,
);
console.log(`rings ${rings.length}  vertices ${total}`);
