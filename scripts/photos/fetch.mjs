/**
 * Sources photography from Wikimedia Commons.
 *
 * Only images under licences that permit commercial use and modification are
 * accepted (CC0 / PD / CC BY / CC BY-SA). Attribution for every image is
 * written to src/data/photos.ts and published at /credits — CC BY and CC BY-SA
 * make that a legal obligation, not a courtesy.
 *
 * Usage: node scripts/photos/fetch.mjs [slotId ...]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { SLOTS } from "./slots.mjs";

const UA = "MishkOverseasSiteBuild/1.0 (https://mishkoverseas.com; tech@hiyakusystems.com)";
const RAW = "scripts/photos/raw";

/* Licences that allow commercial use + modification. Anything else is skipped. */
const OK_LICENCE = /^(CC0|CC BY [0-9.]+|CC BY-SA [0-9.]+|Public domain|PDM|No restrictions)/i;

const api = async (params) => {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams(params);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Commons ${res.status}`);
  return res.json();
};

const strip = (html) => (html ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function search(term, limit = 12) {
  const d = await api({
    action: "query", format: "json", generator: "search", gsrnamespace: "6",
    gsrsearch: term, gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|extmetadata|size|mime", iiurlwidth: "2000",
  });
  const pages = d?.query?.pages ?? {};
  return Object.values(pages).map((p) => {
    const ii = p.imageinfo?.[0];
    if (!ii) return null;
    const em = ii.extmetadata ?? {};
    const g = (k) => strip(em[k]?.value);
    return {
      title: p.title.replace(/^File:/, ""),
      mime: ii.mime,
      width: ii.width, height: ii.height,
      thumb: ii.thumburl,
      descUrl: ii.descriptionurl,
      license: g("LicenseShortName"),
      licenseUrl: em.LicenseUrl?.value ?? "",
      author: g("Artist").slice(0, 90),
      credit: g("Credit").slice(0, 90),
    };
  }).filter(Boolean);
}

function acceptable(c, ratio) {
  if (!/image\/(jpeg|png)/.test(c.mime ?? "")) return false;
  if (!OK_LICENCE.test(c.license ?? "")) return false;
  const ar = c.width / c.height;
  // Need enough pixels to crop from, and roughly the right orientation.
  if (ratio === "wide") return c.width >= 1600 && ar >= 1.2;
  return c.width >= 1200 && c.height >= 1000 && ar >= 0.7 && ar <= 2.2;
}

const only = process.argv.slice(2);
const slots = only.length ? SLOTS.filter((s) => only.includes(s.id)) : SLOTS;

await mkdir(RAW, { recursive: true });
const manifest = [];

for (const slot of slots) {
  let picked = null;

  for (const q of slot.queries) {
    let results = [];
    try {
      results = await search(q);
    } catch (e) {
      console.log(`  ! ${slot.id}: search failed (${e.message})`);
      continue;
    }
    const ok = results.filter((c) => acceptable(c, slot.ratio));
    if (ok.length) {
      // Prefer the largest — more room to crop.
      ok.sort((a, b) => b.width * b.height - a.width * a.height);
      picked = { ...ok[0], query: q, candidates: ok.slice(0, 4) };
      break;
    }
  }

  if (!picked) {
    console.log(`  MISS  ${slot.id}`);
    continue;
  }

  const res = await fetch(picked.thumb, { headers: { "User-Agent": UA } });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(`${RAW}/${slot.id}.jpg`, buf);

  manifest.push({
    slot: slot.id, ratio: slot.ratio, query: picked.query,
    title: picked.title, license: picked.license, licenseUrl: picked.licenseUrl,
    author: picked.author || picked.credit || "Unknown",
    source: picked.descUrl,
    alternates: picked.candidates.slice(1).map((c) => ({
      title: c.title, license: c.license, thumb: c.thumb, source: c.descUrl,
    })),
  });

  console.log(`  ok    ${slot.id.padEnd(22)} ${String(Math.round(buf.length/1024)).padStart(4)}KB  [${picked.license}]  ${picked.title.slice(0, 44)}`);
}

await writeFile(`${RAW}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`\n  ${manifest.length}/${slots.length} sourced -> ${RAW}/manifest.json`);
