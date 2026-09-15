/**
 * Transfer-size report. Run against a PRODUCTION server:
 *   npm run build && npm run start   (then, in another shell)
 *   npm run perf
 *
 * Reports gzipped bytes actually served. Dev-server numbers are meaningless
 * here — they include HMR and unminified modules.
 *
 * ⚠️ This measures PAYLOAD, not Core Web Vitals. LCP, CLS and INP need a real
 * browser; run Lighthouse before launch.
 */
import { execSync } from "node:child_process";

const BASE = process.env.PERF_BASE ?? "http://localhost:3000";

/* The framework floor for Next 16 + React 19 on this project, measured.
   App code is the delta above this. */
const FRAMEWORK_FLOOR_KB = 160;
const APP_BUDGET_KB = 60;

const ROUTES = [
  "/",
  "/supplies",
  "/supplies/provisions",
  "/supplies/catalogue",
  "/spares",
  "/spares/main-engine",
  "/services/main-engine-overhaul",
  "/ports/mundra",
  "/quote",
  "/contact",
];

const gzBytes = (url: string) =>
  parseInt(
    execSync(
      `curl -s -H 'Accept-Encoding: gzip' -o /dev/null -w '%{size_download}' '${url}'`,
    ).toString(),
    10,
  );

const kb = (n: number) => Math.round(n / 1024);
const pad = (n: number, w = 4) => String(n).padStart(w);

console.log("\n  All figures gzipped, as served.\n");
console.log("  ROUTE                       HTML      JS     CSS    APP JS");
console.log("  " + "─".repeat(62));

let failed = 0;

for (const route of ROUTES) {
  const html = await (await fetch(BASE + route)).text();
  const assets = [
    ...new Set(
      [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.(?:js|css))"/g)].map(
        (m) => m[1],
      ),
    ),
  ];

  let js = 0;
  let css = 0;
  for (const a of assets) {
    const b = gzBytes(BASE + a);
    if (a.endsWith(".css")) css += b;
    else js += b;
  }

  const htmlBytes = gzBytes(BASE + route);
  const appJs = Math.max(0, kb(js) - FRAMEWORK_FLOOR_KB);
  const over = appJs > APP_BUDGET_KB;
  if (over) failed++;

  console.log(
    `  ${route.padEnd(26)} ${pad(kb(htmlBytes))}KB ${pad(kb(js))}KB ${pad(kb(css))}KB ${pad(appJs)}KB${over ? "  OVER" : ""}`,
  );
}

console.log("  " + "─".repeat(62));
console.log(
  `\n  Framework floor: ~${FRAMEWORK_FLOOR_KB}KB (React 19 + Next App Router).`,
);
console.log(`  App-code budget: ${APP_BUDGET_KB}KB above the floor.\n`);

process.exit(failed ? 1 : 0);
