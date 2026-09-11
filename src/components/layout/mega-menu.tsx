"use client";

import Link from "next/link";
import { panels, type PanelKey } from "@/data/site";
import { Container } from "./container";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { cn } from "@/lib/utils";

/**
 * The desktop mega-menu panel. Rendered by Header, which owns open/close
 * state and keyboard handling — this component is presentation only.
 *
 * Two columns of categories plus a right-hand promo panel, per §3.
 */
export function MegaMenu({
  panel,
  open,
  id,
  onNavigate,
}: {
  panel: PanelKey;
  open: boolean;
  id: string;
  onNavigate: () => void;
}) {
  const data = panels[panel];

  return (
    <div
      id={id}
      hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full border-b border-navy-600 bg-navy-800/98 backdrop-blur-md",
        "shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]",
      )}
    >
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_20rem]">
        {/* --- Categories ------------------------------------------------- */}
        <div>
          <p className="eyebrow mb-1 text-brass-500">{data.title}</p>
          <HairlineRule className="mb-6" width="w-12" />

          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {data.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-navy-700"
                >
                  <PlimsollBullet className="mt-1 size-4 shrink-0 text-brass-500/60 transition-colors group-hover:text-brass-500" />
                  <span>
                    <span className="block text-sm font-semibold text-cream-50">
                      {item.label}
                    </span>
                    {item.blurb && (
                      <span className="block text-xs text-slate-400">
                        {item.blurb}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={data.href}
            onClick={onNavigate}
            className="mt-6 inline-flex items-center gap-2 px-3 text-sm text-brass-500 transition-colors hover:text-brass-400"
          >
            View all {data.title.toLowerCase()}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* --- Promo panel ------------------------------------------------ */}
        <aside className="rounded-md border border-navy-600 bg-navy-900 p-6">
          <p className="eyebrow mb-3 text-teal-300">{data.promo.eyebrow}</p>
          <p className="font-display text-2xl font-semibold leading-tight text-cream-50">
            {data.promo.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream-200">
            {data.promo.body}
          </p>
          <Link
            href={data.promo.href}
            onClick={onNavigate}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brass-500 transition-colors hover:text-brass-400"
          >
            {data.promo.cta}
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </Container>
    </div>
  );
}
