import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { supplies, totalItems } from "@/data/supplies";

export const metadata: Metadata = {
  title: "Ship Supplies",
  description:
    "Eleven catalogued supply categories — provisions, bonded stores, deck and engine stores, safety equipment, lubricants, paints and more — supplied to vessels at 148 ports worldwide.",
};

export default function SuppliesPage() {
  return (
    <main id="main" className="flex-1">
      {/* --- Hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-16 lg:py-24">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Supplies" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Ship chandling</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            The whole requisition, from one supplier.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            Eleven catalogued categories covering {totalItems}+ published lines.
            Every category lists items with unit of issue and current
            availability, so your purchasing team can build a requisition
            straight from the page.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="brass">{supplies.length} categories</Badge>
            <Badge tone="teal" dot>
              {totalItems} published lines
            </Badge>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/supplies/catalogue" className={buttonClasses()}>
              View full catalogue
            </Link>
            <a
              href="/supplies/catalogue.csv"
              download
              className={buttonClasses({ variant: "outline" })}
            >
              Download CSV
            </a>
          </div>
        </Container>
      </section>

      {/* --- Category grid ---------------------------------------------- */}
      <Section
        eyebrow="Browse"
        title="Supply categories."
        lede="Not seeing a line? We source to order against your codes — send the requisition and we will price it."
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supplies.map((c, i) => (
            <Reveal key={c.slug} as="li" delay={(i % 3) * 60}>
              <Link
                href={`/supplies/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-800 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
              >
                <Photo
                  id={c.slug}
                  ratio="wide"
                  overlay
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold text-cream-50">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{c.tagline}</p>
                  <p className="mt-auto pt-5 font-mono text-xs text-brass-500">
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

      {/* --- How ordering works ----------------------------------------- */}
      <Section
        tone="panel"
        eyebrow="Ordering"
        title="How to send a requisition."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Send it in any format",
              body: "Your own template, a spreadsheet, a PDF or the body of an email. We will work from what your system produces rather than asking you to retype it into ours.",
            },
            {
              title: "Include the vessel and ETA",
              body: "Vessel name, IMO number, port of call and ETA/ETD. That is what determines lead time and whether delivery is alongside or by launch.",
            },
            {
              title: "Get a line-by-line quote",
              body: "Priced against your codes within two hours, with lead time stated per line. Nothing bundled and nothing substituted without asking.",
            },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div className="h-full rounded-md border border-navy-600 bg-navy-900 p-6">
                <p className="font-mono text-xs text-brass-500">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-cream-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-10">
          <Link href="/quote" className={buttonClasses({ size: "lg" })}>
            Request a Quote
          </Link>
        </Reveal>
      </Section>

      <QuoteCTA />
    </main>
  );
}
