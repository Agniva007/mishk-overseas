import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { allMakers, spares, totalSpareLines } from "@/data/spares";

export const metadata: Metadata = {
  title: "Marine Spares",
  description:
    "Marine spare parts for main and auxiliary engines, turbochargers, pumps, purifiers, compressors, deck machinery, hydraulics and automation — genuine, OEM-equivalent or reconditioned.",
  alternates: { canonical: "/spares" },
};

const HOW = [
  {
    step: "01",
    title: "Send the nameplate",
    body: "Maker, type, serial number and the part number from the manual. A photograph of the nameplate and of the part beats a written description and removes a round of clarification.",
  },
  {
    step: "02",
    title: "We quote all three options",
    body: "Genuine, OEM-equivalent and reconditioned where each exists — priced side by side with lead time and origin stated, so the decision is yours and not ours.",
  },
  {
    step: "03",
    title: "Nothing is substituted silently",
    body: "If an equivalent is offered in place of a genuine part it is labelled as an equivalent with the specification difference noted. A silent swap is discovered during fitting, which is the worst possible moment.",
  },
  {
    step: "04",
    title: "Consolidated to the port of call",
    body: "Parts from multiple sources are gathered, checked against the order and forwarded as one consignment with a packing list, rather than arriving piecemeal.",
  },
];

export default function SparesPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-16 lg:py-24">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Spares" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Marine spare parts</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            Parts identified by nameplate, not by description.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            {spares.length} equipment categories covering {totalSpareLines}+
            published lines — engines, turbochargers, pumps, purifiers,
            compressors, deck machinery, hydraulics and automation. Quoted
            genuine, OEM-equivalent or reconditioned, with lead time and origin
            stated per line.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="brass">{spares.length} categories</Badge>
            <Badge tone="teal" dot>
              {totalSpareLines} published lines
            </Badge>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className={buttonClasses()}>
              Send a spares enquiry
            </Link>
            <a
              href="/spares/catalogue.csv"
              download
              className={buttonClasses({ variant: "outline" })}
            >
              Download spares list (CSV)
            </a>
            <Link href="/supplies" className={buttonClasses({ variant: "ghost" })}>
              Looking for stores instead?
            </Link>
          </div>
        </Container>
      </section>

      {/* --- The dividing line: the question buyers actually have ---------- */}
      <Section
        tone="panel"
        eyebrow="Spares or supplies?"
        title="Which section is my item in?"
        lede="The two catalogues split by how the item is identified, which is the same way a purchasing team splits a requisition."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-md border border-navy-600 bg-navy-900 p-7">
              <p className="eyebrow mb-4 text-brass-500">Ship Supplies</p>
              <p className="text-cream-200">
                Ordered by <strong className="font-semibold text-cream-50">description
                and IMPA code</strong>. Generic and interchangeable — any
                compliant item will do.
              </p>
              <ul className="mt-5 space-y-2 font-mono text-xs text-slate-400">
                <li>&ldquo;Gasket sheet, non-asbestos, 2mm&rdquo;</li>
                <li>&ldquo;Valve, gate, bronze, 50mm&rdquo;</li>
                <li>&ldquo;Welding electrode, mild steel&rdquo;</li>
              </ul>
              <Link
                href="/supplies"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass-500 transition-colors hover:text-brass-400"
              >
                Browse Ship Supplies
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="h-full rounded-md border border-brass-500/40 bg-navy-900 p-7">
              <p className="eyebrow mb-4 text-brass-500">Marine Spares</p>
              <p className="text-cream-200">
                Ordered by <strong className="font-semibold text-cream-50">maker,
                model and part number</strong>. The nameplate decides whether
                the part fits.
              </p>
              <ul className="mt-5 space-y-2 font-mono text-xs text-slate-400">
                <li>MAN B&amp;W 6S50MC — exhaust valve spindle</li>
                <li>Alfa Laval MAPX — bowl disc set</li>
                <li>Yanmar 6EY18 — fuel injector</li>
              </ul>
              <p className="mt-6 font-mono text-xs text-teal-300">
                If you have to quote the nameplate, it is a spare.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- Categories ---------------------------------------------------- */}
      <Section
        eyebrow="Browse"
        title="Spares by equipment."
        lede="Organised by the machine the part belongs to, which is how a defect report arrives."
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {spares.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={(i % 3) * 50}>
              <Link
                href={`/spares/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-800 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
              >
                <Photo
                  id={c.photo}
                  ratio="wide"
                  overlay
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold text-cream-50">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{c.tagline}</p>
                  <p className="mt-4 line-clamp-2 font-mono text-[0.6875rem] leading-relaxed text-slate-400">
                    {c.makers.slice(0, 4).join(" · ")}
                  </p>
                  <p className="mt-auto pt-4 font-mono text-xs text-brass-500">
                    {c.items.length} lines
                    <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- How sourcing works -------------------------------------------- */}
      <Section
        tone="panel"
        eyebrow="How it works"
        title="From nameplate to delivery."
      >
        <ol className="grid gap-6 lg:grid-cols-4">
          {HOW.map((h, i) => (
            <Reveal key={h.step} as="li" delay={i * 70}>
              <div className="h-full rounded-md border border-navy-600 bg-navy-900 p-6">
                <p className="font-mono text-xs text-brass-500">{h.step}</p>
                <h3 className="mt-3 text-base font-semibold text-cream-50">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {h.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --- Makers -------------------------------------------------------- */}
      <Section
        eyebrow="Makes"
        title="Makes we source for."
        lede="The equipment we are asked for most often. If your make is not listed it does not mean we cannot source it — send the nameplate."
      >
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {allMakers.map((m) => (
              <li
                key={m}
                className="rounded-sm border border-navy-600 px-3 py-1.5 font-mono text-xs text-cream-200"
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* This distinction matters legally — do not soften it. */}
        <Reveal delay={80}>
          <p className="measure mt-8 rounded-md border border-brass-500/30 bg-brass-500/[0.06] px-5 py-4 text-sm leading-relaxed text-cream-200">
            <strong className="font-semibold text-brass-400">
              We are an independent spares trader.
            </strong>{" "}
            Listing a manufacturer means we source parts for that equipment — it
            is not a claim to be an authorised distributor, agent or licensee of
            any maker named here. All trade marks belong to their owners.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <PlimsollBullet className="mt-1 size-5 shrink-0 text-brass-500" />
            <p className="measure text-sm text-slate-400">
              Need a part fitted as well as supplied? Our{" "}
              <Link href="/services" className="text-brass-500 hover:text-brass-400">
                technical services
              </Link>{" "}
              cover the repair side — quoted separately so you can take either
              or both.
            </p>
          </div>
        </Reveal>
      </Section>

      <QuoteCTA />
    </main>
  );
}
