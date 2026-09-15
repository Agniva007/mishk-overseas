"use client";

import { useId, useMemo, useState } from "react";
import {
  availabilityLabels,
  type Availability,
  type SupplyItem,
} from "@/data/supplies";
import { Input } from "@/components/ui/input";
import { PAGE_SIZE, Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const FILTERS: { key: Availability | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "stock", label: "In stock" },
  { key: "indent", label: "On indent" },
  { key: "on-request", label: "On request" },
];

const toneFor: Record<Availability, string> = {
  stock: "border-teal-500/50 bg-teal-500/12 text-teal-300",
  indent: "border-brass-500/45 bg-brass-500/10 text-brass-400",
  "on-request": "border-cream-50/20 bg-cream-50/5 text-cream-200",
};

/**
 * The searchable item table. This is the substance of a category page and the
 * thing no competitor publishes — it turns the site from a brochure into
 * something a purchasing officer can work from.
 *
 * Filtering is client-side over a list of tens of items, so no virtualisation
 * or debounce is warranted. Paging is applied after filtering, and resets to
 * page 1 whenever the query or filter changes — otherwise a search from page 3
 * lands the reader on an empty page.
 */
export function ItemTable({
  items,
  categoryName,
}: {
  items: SupplyItem[];
  categoryName: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Availability | "all">("all");
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const searchId = useId();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.availability !== filter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.unit.toLowerCase().includes(q) ||
        (item.impaCode?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, query, filter]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  /* Clamp during render rather than in an effect — if a filter shrinks the
     result set below the current page, page 1 is the correct answer now, not
     after a second render. */
  const safePage = Math.min(page, totalPages);

  const rows = showAll
    ? visible
    : visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const counts = useMemo(() => {
    const by = { stock: 0, indent: 0, "on-request": 0 } as Record<Availability, number>;
    for (const i of items) by[i.availability]++;
    return by;
  }, [items]);

  return (
    <div>
      {/* --- Controls -------------------------------------------------- */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:max-w-xs lg:flex-1">
          <label
            htmlFor={searchId}
            className="eyebrow mb-2 block text-brass-500"
          >
            Search {categoryName.toLowerCase()}
          </label>
          <Input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Item name or unit"
            autoComplete="off"
          />
        </div>

        <div>
          <p className="eyebrow mb-2 text-brass-500">Availability</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by availability">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const count =
                f.key === "all" ? items.length : counts[f.key as Availability];
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setFilter(f.key);
                    setPage(1);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs transition-colors",
                    active
                      ? "border-brass-500 bg-brass-500/12 text-brass-400"
                      : "border-navy-600 text-cream-200 hover:border-brass-500/60 hover:text-brass-500",
                  )}
                >
                  {f.label}
                  <span className="font-mono text-[0.625rem] text-slate-400">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Table ------------------------------------------------------ */}
      <div className="overflow-x-auto rounded-md border border-navy-600">
        <table className="w-full min-w-[38rem] text-left">
          <caption className="sr-only">
            {categoryName} — item list with IMPA code, unit of issue and
            availability
          </caption>
          <thead className="bg-navy-800">
            <tr className="border-b border-navy-600">
              <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">
                Item
              </th>
              <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">
                IMPA code
              </th>
              <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">
                Unit
              </th>
              <th scope="col" className="eyebrow px-5 py-3.5 text-slate-400">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr
                key={item.name}
                className="border-b border-navy-600 transition-colors last:border-0 hover:bg-navy-800/60"
              >
                <th
                  scope="row"
                  className="px-5 py-3.5 text-sm font-normal text-cream-50"
                >
                  {item.name}
                </th>
                <td className="px-5 py-3.5 font-mono text-xs">
                  {item.impaCode ? (
                    <span className="text-cream-200">{item.impaCode}</span>
                  ) : (
                    <span
                      className="text-slate-400/70"
                      title="IMPA code pending the client catalogue"
                    >
                      pending
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-cream-200">
                  {item.unit}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "inline-block whitespace-nowrap rounded-sm border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider",
                      toneFor[item.availability],
                    )}
                  >
                    {availabilityLabels[item.availability]}
                  </span>
                </td>
              </tr>
            ))}

            {visible.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center">
                  <p className="text-sm text-cream-200">
                    No items match &ldquo;{query}&rdquo;
                    {filter !== "all" && " with that availability"}.
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    We source to order — send the requisition and we will price
                    it.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-xs text-slate-400">
        {visible.length === items.length
          ? `${items.length} items`
          : `${visible.length} of ${items.length} items match`}
        {!showAll && visible.length > PAGE_SIZE && (
          <> · showing {(safePage - 1) * PAGE_SIZE + 1}&ndash;
            {Math.min(safePage * PAGE_SIZE, visible.length)}</>
        )}
      </p>

      {visible.length > PAGE_SIZE && (
        <Pagination
          className="mt-5"
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          showAll={showAll}
          onShowAllChange={(v) => {
            setShowAll(v);
            setPage(1);
          }}
          totalItems={visible.length}
          label="items"
        />
      )}
    </div>
  );
}
