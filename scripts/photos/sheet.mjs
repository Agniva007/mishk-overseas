/** Contact sheet of the sourced photos, so every one can be eyeballed. */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const DIR = process.argv[2] ?? "scripts/photos/raw";
const OUT = process.argv[3] ?? "/tmp/contact-sheet.jpg";
const COLS = 4, CW = 420, CH = 300, PAD = 8, LABEL = 26;

const files = (await readdir(DIR)).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)).sort();
const rows = Math.ceil(files.length / COLS);
const W = COLS * (CW + PAD) + PAD;
const H = rows * (CH + LABEL + PAD) + PAD;

const composites = [];
for (const [i, f] of files.entries()) {
  const x = PAD + (i % COLS) * (CW + PAD);
  const y = PAD + Math.floor(i / COLS) * (CH + LABEL + PAD);
  const name = path.parse(f).name;

  composites.push({
    input: await sharp(path.join(DIR, f)).resize(CW, CH, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer(),
    left: x, top: y,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="${CW}" height="${LABEL}"><rect width="${CW}" height="${LABEL}" fill="#0A1B2A"/>` +
      `<text x="6" y="18" font-family="monospace" font-size="15" fill="#C9A227">${name}</text></svg>`,
    ),
    left: x, top: y + CH,
  });
}

await sharp({ create: { width: W, height: H, channels: 3, background: "#14181c" } })
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(OUT);

console.log(`  ${files.length} images -> ${OUT}`);
