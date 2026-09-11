"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoPlaceholder } from "@/components/media/photo-placeholder";

/**
 * Category photo gallery with a lightbox.
 *
 * ⚠️ NOT CURRENTLY MOUNTED. The category pages have one photograph each, and
 * six copies of it is not a gallery. This component is complete — lightbox,
 * Escape, arrow keys, focus restore, scroll lock — and should be re-enabled on
 * /supplies/[category] as soon as per-category photo sets exist (ASSETS.md §5).
 * Swap PhotoPlaceholder for <Photo> at that point.
 */
export function Gallery({
  label,
  count = 6,
}: {
  label: string;
  count?: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setOpen((i) => ((i ?? 0) + 1) % count);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setOpen((i) => ((i ?? 0) - 1 + count) % count);
      } else if (e.key === "Tab") {
        /* Only the close button is focusable inside — keep focus on it. */
        e.preventDefault();
        dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, count, close]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`View ${label} image ${i + 1} of ${count}`}
              className="group block w-full overflow-hidden rounded-md border border-navy-600 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-0.5 hover:border-brass-500"
            >
              <PhotoPlaceholder
                label={`${label} ${i + 1}`}
                ratio="square"
                showTag={i === 0}
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} image ${open + 1} of ${count}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 p-5 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-md text-cream-200 transition-colors hover:text-brass-500"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5 L19 19 M19 5 L5 19" />
            </svg>
          </button>

          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PhotoPlaceholder
              label={`${label} ${open + 1}`}
              ratio="wide"
              className="rounded-md border border-navy-600"
            />
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
              {label} · {open + 1} of {count} · ← → to browse, Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
