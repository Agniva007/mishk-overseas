import { availabilityLabels, supplies } from "@/data/supplies";
import { site } from "@/data/site";

/**
 * The catalogue as CSV, generated from the same data the site renders — so it
 * can never drift from the published tables.
 *
 * Purchasing teams work in spreadsheets. Handing them the item list in a
 * format they can paste into a requisition is more useful than a PDF brochure.
 */
export const dynamic = "force-static";

/** RFC 4180 quoting. */
const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const rows: string[] = [];

  rows.push(
    ["Category", "Item", "IMPA code", "Unit", "Availability"].map(cell).join(","),
  );

  for (const category of supplies) {
    for (const item of category.items) {
      rows.push(
        [
          category.name,
          item.name,
          item.impaCode ?? "pending",
          item.unit,
          availabilityLabels[item.availability],
        ]
          .map(cell)
          .join(","),
      );
    }
  }

  /* BOM so Excel opens UTF-8 correctly — the °, × and – characters in this
     data render as mojibake without it. */
  const body = "﻿" + rows.join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${site.name.toLowerCase().replace(/\s+/g, "-")}-catalogue.csv"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
