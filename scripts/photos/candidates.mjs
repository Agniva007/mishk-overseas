/**
 * Downloads several candidates per slot into scripts/photos/cand/<slot>/ so
 * they can be reviewed on a contact sheet and chosen by eye. Commons search
 * relevance is weak; picking blind produces rusty-bolt-in-a-field results.
 *
 * Usage: node scripts/photos/candidates.mjs <slot> "query one" "query two" ...
 */
import { mkdir, writeFile, rm } from "node:fs/promises";

const UA = "MishkOverseasSiteBuild/1.0 (https://mishkoverseas.com; tech@hiyakusystems.com)";
const OK_LICENCE = /^(CC0|CC BY [0-9.]+|CC BY-SA [0-9.]+|Public domain|PDM|No restrictions)/i;

const [slot, ...queries] = process.argv.slice(2);
if (!slot) { console.error("usage: candidates.mjs <slot> <query...>"); process.exit(1); }

const strip = (h) => (h ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function search(term, limit = 10) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
    action: "query", format: "json", generator: "search", gsrnamespace: "6",
    gsrsearch: term, gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|extmetadata|size|mime", iiurlwidth: "1800",
  });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const d = await res.json();
  return Object.values(d?.query?.pages ?? {}).map((p) => {
    const ii = p.imageinfo?.[0]; if (!ii) return null;
    const em = ii.extmetadata ?? {}; const g = (k) => strip(em[k]?.value);
    return {
      title: p.title.replace(/^File:/, ""), mime: ii.mime,
      width: ii.width, height: ii.height, thumb: ii.thumburl,
      descUrl: ii.descriptionurl, license: g("LicenseShortName"),
      licenseUrl: em.LicenseUrl?.value ?? "",
      author: (g("Artist") || g("Credit") || "Unknown").slice(0, 90),
      query: term,
    };
  }).filter(Boolean);
}

const dir = `scripts/photos/cand/${slot}`;
await rm(dir, { recursive: true, force: true });
await mkdir(dir, { recursive: true });

const seen = new Set();
const kept = [];

/* Round-robin across queries — taking 8 straight from the first query just
   returns eight near-identical shots of the same subject. */
const PER_QUERY = 3;
const pools = [];
for (const q of queries) {
  const ok = (await search(q)).filter(
    (c) =>
      /image\/(jpeg|png)/.test(c.mime ?? "") &&
      OK_LICENCE.test(c.license ?? "") &&
      c.width >= 1100 &&
      c.height >= 750,
  );
  pools.push(ok.slice(0, PER_QUERY));
}

const interleaved = [];
for (let i = 0; i < PER_QUERY; i++) {
  for (const pool of pools) if (pool[i]) interleaved.push(pool[i]);
}

for (const c of interleaved) {
  if (kept.length >= 8) break;
  if (seen.has(c.title)) continue;
  seen.add(c.title);
  const res = await fetch(c.thumb, { headers: { "User-Agent": UA } });
  if (!res.ok) continue;
  const idx = String(kept.length + 1).padStart(2, "0");
  await writeFile(`${dir}/${idx}.jpg`, Buffer.from(await res.arrayBuffer()));
  kept.push({ file: `${idx}.jpg`, ...c });
}

await writeFile(`${dir}/candidates.json`, JSON.stringify(kept, null, 2));
console.log(`  ${slot}: ${kept.length} candidates`);
kept.forEach((c, i) => console.log(`    ${String(i+1).padStart(2,"0")}  [${c.license}] ${c.title.slice(0,56)}`));
