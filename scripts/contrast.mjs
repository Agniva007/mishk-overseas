/**
 * WCAG contrast audit for the Mishk Overseas palette.
 * Run after ANY palette change:  npm run contrast
 * Exits non-zero if a pair is used in a role its ratio cannot support.
 */

const hex = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const L = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [L(a), L(b)];
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

const T = {
  "navy-900": "#0A1B2A",
  "navy-800": "#0F2438",
  "cream-50": "#F2EDE3",
  "cream-200": "#D9D2C4",
  "slate-400": "#8A99A8",
  "brass-500": "#C9A227",
  "brass-400": "#DCBB4B",
  "brass-700": "#7A5F0F",
  "teal-500": "#2E7D8F",
  "teal-300": "#57AFC2",
  "rust-500": "#B4552F",
  "rust-300": "#D97A4E",
  "paper-50": "#FBF9F5",
  "ink-900": "#0A1B2A",
};

/** role: "body" needs >=4.5, "large" (large text / UI / borders) needs >=3. */
const CHECKS = [
  ["cream-50", "navy-900", "body"],
  ["cream-200", "navy-900", "body"],
  ["slate-400", "navy-900", "body"],
  ["brass-500", "navy-900", "body"],
  ["brass-400", "navy-900", "body"],
  ["teal-300", "navy-900", "body"],
  ["rust-300", "navy-900", "body"],
  ["teal-500", "navy-900", "large"],
  ["rust-500", "navy-900", "large"],
  ["cream-50", "navy-800", "body"],
  ["slate-400", "navy-800", "body"],
  ["ink-900", "paper-50", "body"],
  ["brass-700", "paper-50", "body"],
  ["rust-500", "paper-50", "body"],
  ["teal-500", "paper-50", "large"],
  ["navy-900", "brass-500", "body"],
];

let failed = 0;
console.log("\n  FOREGROUND        GROUND        RATIO   ROLE    RESULT");
console.log("  " + "─".repeat(58));
for (const [fg, bg, role] of CHECKS) {
  const r = ratio(T[fg], T[bg]);
  const need = role === "body" ? 4.5 : 3;
  const ok = r >= need;
  if (!ok) failed++;
  console.log(
    `  ${fg.padEnd(17)} ${bg.padEnd(13)} ${r.toFixed(2).padStart(5)}:1  ${role.padEnd(6)}  ${ok ? "pass" : `FAIL (needs ${need})`}`,
  );
}
console.log("  " + "─".repeat(58));
console.log(failed ? `\n  ${failed} pair(s) FAILED.\n` : "\n  All pairs pass.\n");
process.exit(failed ? 1 : 0);
