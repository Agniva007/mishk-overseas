import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Photo } from "@/components/media/photo";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { serviceDetails } from "@/data/services";

export const metadata: Metadata = {
  title: "Technical Services",
  description:
    "Ship repair, spares procurement, motor rewinding, fabrication and welding, mechanical and electrical attendance, and riding squads at Indian and Gulf ports.",
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-16 lg:py-24">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Marine technical services</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            Repairs scoped before anyone is mobilised.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            Six service lines covering running repairs, sourcing, workshop
            jobs and crew supplied at sea. Every scope states what is included
            and what is not, so the quotation is the price.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="brass">{serviceDetails.length} service lines</Badge>
            <Badge tone="rust" dot>
              24×7 attendance
            </Badge>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Browse"
        title="What we attend to."
        lede="Send the defect report and we will scope against it before quoting."
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceDetails.map((s, i) => (
            <Reveal key={s.slug} as="li" delay={(i % 3) * 60}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-800 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
              >
                <Photo
                  id={s.slug}
                  ratio="wide"
                  overlay
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold text-cream-50">
                    {s.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{s.tagline}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.capabilities.slice(0, 3).map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <PlimsollBullet className="mt-0.5 size-3.5 shrink-0 text-brass-500/70" />
                        <span className="text-xs text-cream-200">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5 font-mono text-xs text-brass-500">
                    Read the scope
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

      <QuoteCTA />
    </main>
  );
}
