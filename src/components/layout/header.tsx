"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site, type PanelKey } from "@/data/site";
import { buttonClasses } from "@/components/ui/button";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { Container } from "./container";
import { MegaMenu } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

/** ms to wait before closing on pointer-out, so a diagonal mouse path survives. */
const CLOSE_DELAY = 140;

/** Routes whose first section is a full-bleed hero the header should sit over. */
const OVERLAY_ROUTES = ["/", "/styleguide"];

export function Header({ overlay }: { overlay?: boolean }) {
  const [openPanel, setOpenPanel] = useState<PanelKey | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrolled(80);
  const pathname = usePathname();
  const isOverlay = overlay ?? OVERLAY_ROUTES.includes(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenPanel(null), CLOSE_DELAY);
  }, [cancelClose]);

  /* Close everything on route change. Adjusting state during render is the
     sanctioned pattern here — an effect would cause a cascading render. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenPanel(null);
    setDrawerOpen(false);
  }

  /* Escape closes the panel and returns focus to its trigger. */
  useEffect(() => {
    if (!openPanel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = headerRef.current?.querySelector<HTMLElement>(
        `[data-panel-trigger="${openPanel}"]`,
      );
      setOpenPanel(null);
      trigger?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openPanel]);

  /* Click outside the header closes the panel. */
  useEffect(() => {
    if (!openPanel) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openPanel]);

  useEffect(() => cancelClose, [cancelClose]);

  /* Solid whenever it isn't overlaying a hero, or once scrolled, or open. */
  const solid = !isOverlay || scrolled || openPanel !== null;

  return (
    <>
      <header
        ref={headerRef}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenPanel(null);
        }}
        className={cn(
          "sticky top-0 z-40 transition-colors duration-200",
          solid
            ? "border-b border-navy-600 bg-navy-900/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          {/* --- Logo -------------------------------------------------- */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md"
            aria-label={`${site.name} — home`}
          >
            <PlimsollBullet className="size-7 text-brass-500" />
            <span className="font-display text-lg font-semibold tracking-tight text-cream-50">
              {site.name}
            </span>
          </Link>

          {/* --- Desktop nav ------------------------------------------- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((entry) => {
                const active =
                  pathname === entry.href || pathname.startsWith(entry.href + "/");

                if (!("panel" in entry) || !entry.panel) {
                  return (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        className={cn(
                          "inline-flex h-10 items-center rounded-md px-3.5 text-sm transition-colors",
                          active
                            ? "text-brass-500"
                            : "text-cream-200 hover:text-brass-500",
                        )}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }

                const panelId = `megamenu-${entry.panel}`;
                const isOpen = openPanel === entry.panel;

                return (
                  <li
                    key={entry.href}
                    onPointerEnter={() => {
                      cancelClose();
                      setOpenPanel(entry.panel);
                    }}
                    onPointerLeave={scheduleClose}
                  >
                    <button
                      data-panel-trigger={entry.panel}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenPanel(isOpen ? null : entry.panel)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenPanel(entry.panel);
                          requestAnimationFrame(() => {
                            document
                              .getElementById(panelId)
                              ?.querySelector<HTMLElement>("a")
                              ?.focus();
                          });
                        }
                      }}
                      className={cn(
                        "inline-flex h-10 items-center gap-1.5 rounded-md px-3.5 text-sm transition-colors",
                        isOpen || active
                          ? "text-brass-500"
                          : "text-cream-200 hover:text-brass-500",
                      )}
                    >
                      {entry.label}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- CTA + burger ------------------------------------------ */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/quote"
              className={buttonClasses({ size: "md", className: "hidden sm:inline-flex" })}
            >
              Request a Quote
            </Link>

            <button
              ref={burgerRef}
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-label="Open navigation"
              className="-mr-2 flex size-11 items-center justify-center rounded-md text-cream-50 transition-colors hover:text-brass-500 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </Container>

        {/* --- Mega-menu panels ---------------------------------------- */}
        <div
          className="hidden lg:block"
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
        >
          {(["supplies", "services", "about"] as const).map((key) => (
            <MegaMenu
              key={key}
              panel={key}
              id={`megamenu-${key}`}
              open={openPanel === key}
              onNavigate={() => setOpenPanel(null)}
            />
          ))}
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={burgerRef}
      />
    </>
  );
}
