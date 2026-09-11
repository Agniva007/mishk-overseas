/** Contact sheet of candidates for several slots, labelled slot/NN. */
import sharp from "sharp";
import { readdir } from "node:fs/promises";

const slots = process.argv.slice(2, -1);
const OUT = process.argv.at(-1);
const COLS = 4, CW = 380, CH = 270, PAD = 6, LABEL = 24;

const cells = [];
for (const slot of slots) {
  const dir = `scripts/photos/cand/${slot}`;
  const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg")).sort();
  for (const f of files) cells.push({ slot, file: `${dir}/${f}`, n: f.replace(".jpg", "") });
}

const rows = Math.ceil(cells.length / COLS);
const W = COLS * (CW + PAD) + PAD;
const H = rows * (CH + LABEL + PAD) + PAD;
const composites = [];

for (const [i, c] of cells.entries()) {
  const x = PAD + (i % COLS) * (CW + PAD);
  const y = PAD + Math.floor(i / COLS) * (CH + LABEL + PAD);
  composites.push({
    input: await sharp(c.file).resize(CW, CH, { fit: "cover" }).jpeg({ quality: 78 }).toBuffer(),
    left: x, top: y,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="${CW}" height="${LABEL}"><rect width="${CW}" height="${LABEL}" fill="#0A1B2A"/>` +
      `<text x="6" y="17" font-family="monospace" font-size="14" fill="#C9A227">${c.slot} / ${c.n}</text></svg>`),
    left: x, top: y + CH,
  });
}

await sharp({ create: { width: W, height: H, channels: 3, background: "#14181c" } })
  .composite(composites).jpeg({ quality: 80 }).toFile(OUT);
console.log(`  ${cells.length} candidates -> ${OUT}`);
