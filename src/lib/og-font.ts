import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Fonts for ImageResponse (Open Graph cards).
 *
 * ImageResponse uses satori, which needs raw font buffers and cannot read the
 * next/font pipeline or the CSS custom properties.
 *
 * ⚠️ These MUST be STATIC instances. Satori cannot parse the variable Fraunces
 * the rest of the site uses — it throws "Cannot read properties of undefined".
 * Google's `l/font?kit=` endpoint also serves an EOT-ish subset to old IE user
 * agents that satori rejects with "Unsupported OpenType signature"; the files
 * here were fetched with an Android UA, which returns real TTF.
 *
 * Loaded at build time only — every OG route is statically generated — so the
 * file sizes are a repo cost, not a runtime one.
 */

type SatoriFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal";
};

const FILES = [
  { file: "fraunces-600.ttf", name: "Fraunces", weight: 600 },
  { file: "inter-600.ttf", name: "Inter", weight: 600 },
  { file: "inter-400.ttf", name: "Inter", weight: 400 },
] as const;

let cached: SatoriFont[] | null = null;

export async function ogFonts(): Promise<SatoriFont[]> {
  if (cached) return cached;

  cached = await Promise.all(
    FILES.map(async ({ file, name, weight }) => {
      const buf = await readFile(
        path.join(process.cwd(), "src/assets/fonts", file),
      );
      return {
        name,
        data: buf.buffer.slice(
          buf.byteOffset,
          buf.byteOffset + buf.byteLength,
        ) as ArrayBuffer,
        weight,
        style: "normal" as const,
      };
    }),
  );

  return cached;
}

/** Brand tokens as literals — satori renders outside the CSS layer. */
export const OG = {
  navy: "#0A1B2A",
  navy800: "#0F2438",
  navy600: "#1F4460",
  brass: "#C9A227",
  cream: "#F2EDE3",
  slate: "#8A99A8",
  teal: "#57AFC2",
  size: { width: 1200, height: 630 },
  grid:
    "linear-gradient(to right, rgba(242,237,227,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,237,227,0.05) 1px, transparent 1px)",
} as const;
