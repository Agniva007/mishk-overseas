import { availabilityLabels, spares } from "@/data/spares";
import { site } from "@/data/site";

/**
 * The spares catalogue as CSV, generated from the same data the site renders.
 *
 * Columns differ from the stores catalogue on purpose: there is no IMPA
 * column (spares are identified by nameplate, not by code) and a "supply
 * basis" column carries the useful information instead. A "Makes" column
 * lists what we source for in that category.
 */
export const dynamic = "force-static";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const rows: string[] = [];

  rows.push(
    ["Category", "Part or assembly", "Supply basis", "Availability", "Makes sourced"]
      .map(cell)
      .join(","),
  );

  for (const category of spares) {
    const makes = category.makers.join("; ");
    for (const item of category.items) {
      rows.push(
        [
          category.name,
          item.name,
          item.note ?? "Genuine, equivalent or reconditioned",
          availabilityLabels[item.availability],
          makes,
        ]
          .map(cell)
          .join(","),
      );
    }
  }

  /* BOM so Excel reads UTF-8 — the × and – characters need it. */
  const body = "﻿" + rows.join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${site.name.toLowerCase().replace(/\s+/g, "-")}-spares.csv"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
