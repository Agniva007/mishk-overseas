/**
 * Accessibility audit. Fetches each route from a running dev/prod server and
 * runs axe-core against the served HTML in jsdom.
 *
 * ⚠️ LIMITS OF THIS APPROACH: jsdom has no layout engine, so rules that need
 * rendered geometry do not run — notably `color-contrast` and target-size.
 * Colour contrast is separately verified against the tokens by
 * `npm run contrast`. A real browser pass (axe DevTools or Lighthouse) is
 * still required before launch; this catches the structural faults — missing
 * labels, bad heading order, unlabelled controls, landmark problems — which
 * is the majority of them.
 *
 * Usage: npm run dev, then npm run audit:a11y
 */
import { JSDOM, VirtualConsole } from "jsdom";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

/* axe must run INSIDE the jsdom window — it reads window/document from its own
   scope, so injecting the source is more reliable than shimming globals. */
const require_ = createRequire(import.meta.url);
const AXE_SOURCE = readFileSync(require_.resolve("axe-core"), "utf8");

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/supplies",
  "/supplies/provisions",
  "/services",
  "/services/ship-repair",
  "/ports",
  "/ports/mundra",
  "/quote",
  "/contact",
  "/about",
  "/clients",
  "/credits",
  "/supplies/catalogue",
  "/legal/privacy",
  "/styleguide",
  "/nonexistent-page",
];

type AxeViolation = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: string[] }[];
};

type Finding = {
  route: string;
  id: string;
  impact: string;
  nodes: number;
  help: string;
  sample: string;
};

const findings: Finding[] = [];
let audited = 0;

for (const route of ROUTES) {
  let html: string;
  try {
    const res = await fetch(BASE + route);
    html = await res.text();
  } catch {
    console.log(`  SKIP  ${route} (server not reachable at ${BASE})`);
    continue;
  }

  /* jsdom cannot parse Tailwind v4's @layer/oklch CSS; silence that noise. */
  const virtualConsole = new VirtualConsole();

  const dom = new JSDOM(html, {
    url: BASE + route,
    pretendToBeVisual: true,
    runScripts: "outside-only",
    virtualConsole,
  });
  const { window } = dom;

  window.eval(AXE_SOURCE);

  const results = (await (
    window as unknown as {
      axe: {
        run: (ctx: unknown, opts: unknown) => Promise<{ violations: AxeViolation[] }>;
      };
    }
  ).axe.run(window.document, {
    /* Rules needing layout cannot pass meaningfully in jsdom. */
    rules: { "color-contrast": { enabled: false } },
    resultTypes: ["violations"],
  })) as { violations: AxeViolation[] };

  audited++;
  for (const v of results.violations) {
    findings.push({
      route,
      id: v.id,
      impact: v.impact ?? "unknown",
      nodes: v.nodes.length,
      help: v.help,
      sample: v.nodes[0]?.target?.join(" ") ?? "",
    });
  }

  const count = results.violations.length;
  console.log(`  ${count === 0 ? "pass" : `${count} issue(s)`.padEnd(4)}  ${route}`);
  dom.window.close();
}

console.log(`\n  Audited ${audited} route(s).`);

if (findings.length === 0) {
  console.log("  No structural violations found.\n");
  console.log("  NOTE: colour-contrast is not checked here (no layout engine).");
  console.log("  Run `npm run contrast` for the token audit, and a browser");
  console.log("  pass with axe DevTools before launch.\n");
  process.exit(0);
}

console.log("\n  VIOLATIONS\n  " + "─".repeat(70));
const order = ["critical", "serious", "moderate", "minor", "unknown"];
findings.sort((a, b) => order.indexOf(a.impact) - order.indexOf(b.impact));
for (const f of findings) {
  console.log(`  [${f.impact}] ${f.id} — ${f.nodes} node(s)`);
  console.log(`    ${f.route}`);
  console.log(`    ${f.help}`);
  if (f.sample) console.log(`    first: ${f.sample}`);
  console.log();
}
process.exit(1);
