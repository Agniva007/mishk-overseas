import { Container } from "./container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";

/**
 * Shell for legal documents.
 *
 * ⚠️ The draft banner is not decoration. These documents carry regulatory
 * weight — India's DPDP Act 2023 and, for EU-based counterparties, the GDPR.
 * Publishing an unreviewed policy as final is a compliance risk, so the
 * banner stays until counsel signs off. Remove it in ONE place when they do.
 */
export function LegalPage({
  title,
  updated,
  breadcrumb,
  children,
}: {
  title: string;
  updated: string;
  breadcrumb: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: breadcrumb }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Legal</p>
          <h1 className="text-5xl lg:text-6xl">{title}</h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
            Last updated {updated}
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div
            role="note"
            className="mb-12 rounded-md border border-rust-500/50 bg-rust-500/10 p-6"
          >
            <p className="eyebrow mb-2 text-rust-300">
              Draft — not legally reviewed
            </p>
            <p className="measure text-sm leading-relaxed text-cream-200">
              This document is a structural draft written to industry norms. It
              has <strong className="font-semibold">not</strong> been reviewed
              by a lawyer and must not be relied on as published policy. It
              needs review against India&rsquo;s Digital Personal Data
              Protection Act 2023 and, where EU-based counterparties are served,
              the GDPR. See ASSETS.md §9.
            </p>
          </div>

          <div className="measure space-y-10">{children}</div>
        </Container>
      </section>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-cream-50">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-cream-200 [&_a]:text-brass-500 [&_a:hover]:text-brass-400 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
