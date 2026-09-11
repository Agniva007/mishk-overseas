import Link from "next/link";
import {
  aboutLinks,
  services,
  site,
  supplyCategories,
} from "@/data/site";
import { Container } from "./container";
import { ChainDivider } from "@/components/marine/chain-divider";
import { CompassRose } from "@/components/marine/compass-rose";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="eyebrow font-sans text-brass-500">{children}</h2>
      <HairlineRule className="mb-5 mt-2" width="w-8" />
    </>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-cream-200 transition-colors hover:text-brass-500"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  /* Server component — evaluated at build time, so no hydration mismatch. */
  const year = new Date().getFullYear();

  return (
    <>
      {/* Motif 4 — used exactly once per page, here. */}
      <ChainDivider />

      <footer className="relative overflow-hidden border-t border-navy-600 bg-navy-800">
        <CompassRose className="pointer-events-none absolute -bottom-32 -right-28 size-[30rem] text-cream-50/[0.04]" />

        <Container className="relative">
          <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* --- Company ---------------------------------------------- */}
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <PlimsollBullet className="size-7 text-brass-500" />
                <span className="font-display text-lg font-semibold text-cream-50">
                  {site.name}
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Ship chandling and marine technical services across Indian and
                Gulf ports. One window for the whole requisition.
              </p>

              <ul className="mt-6 flex gap-4">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-brass-500"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- Supplies --------------------------------------------- */}
            <nav aria-labelledby="footer-supplies">
              <div id="footer-supplies">
                <ColumnHeading>Supplies</ColumnHeading>
              </div>
              <ul className="space-y-2.5">
                {supplyCategories.slice(0, 8).map((c) => (
                  <FooterLink key={c.href} href={c.href} label={c.label} />
                ))}
                <li>
                  <Link
                    href="/supplies"
                    className="text-sm text-brass-500 transition-colors hover:text-brass-400"
                  >
                    All categories →
                  </Link>
                </li>
              </ul>
            </nav>

            {/* --- Services --------------------------------------------- */}
            <nav aria-labelledby="footer-services">
              <div id="footer-services">
                <ColumnHeading>Services</ColumnHeading>
              </div>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <FooterLink key={s.href} href={s.href} label={s.label} />
                ))}
              </ul>

              <div className="mt-8">
                <ColumnHeading>Company</ColumnHeading>
                <ul className="space-y-2.5">
                  {aboutLinks.map((a) => (
                    <FooterLink key={a.href} href={a.href} label={a.label} />
                  ))}
                  <FooterLink href="/ports" label="Ports We Serve" />
                </ul>
              </div>
            </nav>

            {/* --- Offices ---------------------------------------------- */}
            <div>
              <ColumnHeading>Offices</ColumnHeading>

              <div className="space-y-6">
                {site.offices.map((office) => (
                  <div key={office.label}>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-teal-300">
                      {office.label}
                    </p>
                    <address className="mt-2 not-italic text-sm leading-relaxed text-slate-400">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="mt-1.5 block font-mono text-xs text-cream-200 transition-colors hover:text-brass-500"
                    >
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="block font-mono text-xs text-cream-200 transition-colors hover:text-brass-500"
                    >
                      {office.email}
                    </a>
                  </div>
                ))}
              </div>

              {/* 24×7 desk — the one rust-toned element on the page. */}
              <div className="mt-6 rounded-md border border-rust-500/40 bg-rust-500/10 p-4">
                <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-rust-300">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-rust-500" />
                  24×7 Emergency
                </p>
                <a
                  href={site.emergency.href}
                  className="mt-2 block font-mono text-sm text-cream-50 transition-colors hover:text-brass-500"
                >
                  {site.emergency.display}
                </a>
              </div>
            </div>
          </div>

          {/* --- Bottom bar --------------------------------------------- */}
          <div className="flex flex-col gap-4 border-t border-navy-600 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">
              © {year} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <FooterLink href="/legal/privacy" label="Privacy" />
              <FooterLink href="/legal/terms" label="Terms" />
              {/* Licence condition for the CC BY / CC BY-SA photography. */}
              <FooterLink href="/credits" label="Photo credits" />
              <li className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-400">
                Made for the maritime trade
              </li>
            </ul>
          </div>
        </Container>
      </footer>
    </>
  );
}
