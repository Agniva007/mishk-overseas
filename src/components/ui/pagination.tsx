"use client";

import { cn } from "@/lib/utils";

/**
 * Table pagination.
 *
 * Shows a windowed page list with first/last always visible and ellipses in
 * between, so the control stays a fixed width whether there are 3 pages or 30.
 *
 * Includes a "Show all" escape hatch on purpose: a purchasing officer scanning
 * a catalogue will reach for Ctrl+F, and paging silently hides rows from it.
 */

/** Page numbers to render, with `null` marking an ellipsis gap. */
function pageWindow(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | null)[] = [1];
  const from = Math.max(2, current - 1);
  const to = Math.min(total - 1, current + 1);

  if (from > 2) pages.push(null);
  for (let p = from; p <= to; p++) pages.push(p);
  if (to < total - 1) pages.push(null);

  pages.push(total);
  return pages;
}

const arrowBase =
  "inline-flex h-9 items-center gap-1.5 rounded-sm border px-3 text-xs transition-colors " +
  "disabled:pointer-events-none disabled:opacity-35";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  showAll,
  onShowAllChange,
  totalItems,
  label = "results",
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  showAll: boolean;
  onShowAllChange: (v: boolean) => void;
  totalItems: number;
  /** Plural noun for the "Show all" button, e.g. "lines". */
  label?: string;
  className?: string;
}) {
  const pages = pageWindow(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {showAll ? (
        <p className="font-mono text-xs text-slate-400">
          Showing all {totalItems} {label}
        </p>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className={cn(arrowBase, "border-navy-600 text-cream-200 hover:border-brass-500 hover:text-brass-500")}
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">Prev</span>
            <span className="sr-only sm:hidden">Previous page</span>
          </button>

          <ul className="flex items-center gap-1.5">
            {pages.map((p, i) =>
              p === null ? (
                <li
                  key={`gap-${i}`}
                  aria-hidden="true"
                  className="px-1 font-mono text-xs text-navy-600"
                >
                  …
                </li>
              ) : (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => onPageChange(p)}
                    aria-current={p === page ? "page" : undefined}
                    aria-label={`Page ${p}`}
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-sm border font-mono text-xs transition-colors",
                      p === page
                        ? "border-brass-500 bg-brass-500/12 text-brass-400"
                        : "border-navy-600 text-cream-200 hover:border-brass-500 hover:text-brass-500",
                    )}
                  >
                    {p}
                  </button>
                </li>
              ),
            )}
          </ul>

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className={cn(arrowBase, "border-navy-600 text-cream-200 hover:border-brass-500 hover:text-brass-500")}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sr-only sm:hidden">Next page</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => onShowAllChange(!showAll)}
        className="self-start text-xs text-brass-500 underline-offset-2 transition-colors hover:text-brass-400 hover:underline sm:self-auto"
      >
        {showAll ? `Show ${PAGE_SIZE} per page` : `Show all ${totalItems} ${label}`}
      </button>
    </nav>
  );
}

/** Rows per page. Shared so the table and the toggle label cannot disagree. */
export const PAGE_SIZE = 12;
