"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { panels, primaryNav, site } from "@/data/site";
import { buttonClasses } from "@/components/ui/button";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { CompassRose } from "@/components/marine/compass-rose";
import { cn } from "@/lib/utils";

/**
 * Full-screen mobile navigation. Mega-menu panels become accordions here.
 * Traps focus, closes on Escape, and restores focus to the trigger.
 */
export function MobileDrawer({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll while open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Escape to close, and a simple focus trap across the drawer. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, triggerRef]);

  /* Move focus into the drawer on open. */
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-navy-900 lg:hidden"
    >
      <CompassRose className="pointer-events-none absolute -right-24 top-20 size-96 text-cream-50/[0.04]" />

      <div className="relative flex min-h-full flex-col px-5 pb-10 pt-5">
        {/* --- Close --------------------------------------------------- */}
        <div className="mb-8 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <PlimsollBullet className="size-6 text-brass-500" />
            <span className="font-display text-lg font-semibold">
              {site.name}
            </span>
          </span>
          <button
            onClick={() => {
              onClose();
              triggerRef.current?.focus();
            }}
            aria-label="Close navigation"
            className="-mr-2 flex size-11 items-center justify-center rounded-md text-cream-200 transition-colors hover:text-brass-500"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5 L19 19 M19 5 L5 19" />
            </svg>
          </button>
        </div>

        {/* --- Nav ----------------------------------------------------- */}
        <nav className="flex-1">
          <ul className="divide-y divide-navy-600 border-y border-navy-600">
            {primaryNav.map((entry) => {
              if (!("panel" in entry) || !entry.panel) {
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-cream-50 transition-colors hover:text-brass-500"
                    >
                      {entry.label}
                      <span aria-hidden="true" className="text-brass-500">→</span>
                    </Link>
                  </li>
                );
              }

              const data = panels[entry.panel];
              const isOpen = expanded === entry.panel;

              return (
                <li key={entry.href}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : entry.panel)}
                    aria-expanded={isOpen}
                    aria-controls={`drawer-${entry.panel}`}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold text-cream-50 transition-colors hover:text-brass-500"
                  >
                    {entry.label}
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 text-brass-500 transition-transform duration-200",
                        isOpen && "rotate-45",
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  <div id={`drawer-${entry.panel}`} hidden={!isOpen}>
                    <ul className="pb-5">
                      {data.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 py-2.5 text-sm text-cream-200 transition-colors hover:text-brass-500"
                          >
                            <PlimsollBullet className="size-4 shrink-0 text-brass-500/60" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- Footer of drawer ---------------------------------------- */}
        <div className="mt-8 space-y-4">
          <Link
            href="/quote"
            onClick={onClose}
            className={buttonClasses({ size: "lg", className: "w-full" })}
          >
            Request a Quote
          </Link>

          <div className="space-y-2 border-t border-navy-600 pt-5 font-mono text-xs">
            <p className="flex items-center gap-2 uppercase tracking-[0.14em] text-slate-400">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-teal-500" />
              24×7 Supply Desk
            </p>
            <a href={site.phone.href} className="block text-cream-50 hover:text-brass-500">
              {site.phone.display}
            </a>
            <a href={site.email.href} className="block text-cream-50 hover:text-brass-500">
              {site.email.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
