import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { PortChart } from "@/components/marine/port-chart";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { QuoteCTA } from "@/components/sections/quote-cta";
import { coastLabels, ports, type Coast } from "@/data/ports";

export const metadata: Metadata = {
  title: "Ports We Serve",
  description:
    "Ship supply and technical attendance across 21 ports on India's west and east coasts and in the Gulf, with delivery alongside or at anchorage.",
};

const COASTS: Coast[] = ["west", "east", "gulf"];

export default function PortsPage() {
  const active = ports.filter((p) => p.active).length;

  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <CompassRose className="absolute -right-28 -top-32 size-[32rem] text-cream-50/[0.05]" />
        <Container className="relative py-16 lg:py-24">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Ports" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Coverage</p>
          <h1 className="max-w-3xl text-5xl lg:text-6xl">
            Ports we serve.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            {ports.length} ports across India&rsquo;s west and east coasts and
            the Gulf — {active} with our own delivery, the remainder through
            partner agents. Delivery alongside or by launch at anchorage.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="teal" dot>
              {active} own delivery
            </Badge>
            <Badge tone="neutral">{ports.length - active} on request</Badge>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Chart"
        title="Where we deliver."
        lede="Brass marks a port with our own delivery. Hover a dot for its LOCODE."
      >
        <Reveal className="rounded-md border border-navy-600 bg-navy-800 p-4 lg:p-8">
          <PortChart />
        </Reveal>
      </Section>

      {COASTS.map((coast, ci) => {
        const list = ports.filter((p) => p.coast === coast);
        return (
          <Section
            key={coast}
            tone={ci % 2 === 0 ? "panel" : "navy"}
            eyebrow={coastLabels[coast]}
            title={`${coastLabels[coast]} — ${list.length} ports`}
          >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((port, i) => (
                <Reveal key={port.slug} as="li" delay={(i % 3) * 50}>
                  <Link
                    href={`/ports/${port.slug}`}
                    className="group flex h-full flex-col rounded-md border border-navy-600 bg-navy-900 p-5 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold text-cream-50">
                        {port.name}
                      </h2>
                      <span className="shrink-0 rounded-sm border border-teal-500/40 px-2 py-0.5 font-mono text-[0.625rem] tracking-wider text-teal-300">
                        {port.locode}
                      </span>
                    </div>

                    <dl className="mt-4 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Lead time</dt>
                        <dd className="text-cream-200">{port.leadTime}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Delivery</dt>
                        <dd className="text-cream-200">
                          {[port.alongside && "Alongside", port.anchorage && "Anchorage"]
                            .filter(Boolean)
                            .join(" · ") || "On request"}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-auto pt-4 font-mono text-xs text-brass-500">
                      {port.active ? "Own delivery" : "Partner agent"}
                      <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}

      <QuoteCTA />
    </main>
  );
}
