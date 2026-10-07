import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ChartLegend, WorldChart } from "@/components/marine/world-chart";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { PortTag } from "@/components/marine/port-tag";
import { QuoteCTA } from "@/components/sections/quote-cta";
import {
  countryCount,
  detailPorts,
  networkByCountry,
  ports,
  portsInRegion,
  regionLabels,
  regionOrder,
  type Region,
} from "@/data/ports";

export const metadata: Metadata = {
  title: "Ports We Serve",
  description: `Ship supply and technical attendance at ${ports.length} ports in ${countryCount} countries — India's west and east coasts, the Arabian Gulf, Suez and the Red Sea, the Far East, South East Asia, Australia, Europe, the Americas and Africa.`,
};

/* The regions we hold stock in and deliver ourselves. Everything else is
   reached through the agent network and is listed, not detailed. */
const CORE_REGIONS: Region[] = ["india-west", "india-east", "middle-east"];
const NETWORK_REGIONS = regionOrder.filter((r) => !CORE_REGIONS.includes(r));

export default function PortsPage() {
  const own = detailPorts.filter((p) => p.active).length;
  const agentCount = ports.length - own;

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
            {ports.length} ports. One supplier.
          </h1>
          <HairlineRule className="my-8" width="w-24" />
          <p className="measure text-lg text-cream-200">
            {ports.length} ports across {countryCount} countries —{" "}
            {own} with our own delivery on India&rsquo;s west and east coasts
            and at the UAE hubs, the remainder supplied and attended through
            appointed local agents. Delivery alongside or by launch at
            anchorage.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="teal" dot>
              {own} own delivery
            </Badge>
            <Badge tone="neutral">{agentCount} through local agents</Badge>
            <Badge tone="brass">{countryCount} countries</Badge>
          </div>
        </Container>
      </section>

      {/* --- Region summary ----------------------------------------------- */}
      <Section
        eyebrow="At a glance"
        title="The network, region by region."
        lede="Jump to a region, or scroll for the full list with UN/LOCODEs."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regionOrder.map((region, i) => (
            <Reveal key={region} as="li" delay={(i % 3) * 40}>
              <Link
                href={`#${region}`}
                className="flex h-full items-center justify-between gap-4 rounded-md border border-navy-600 bg-navy-800 px-5 py-4 transition-colors hover:border-brass-500"
              >
                <span className="text-sm text-cream-200">
                  {regionLabels[region]}
                </span>
                <span className="shrink-0 font-mono text-sm text-brass-500">
                  {portsInRegion(region).length}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --- Chart: every port, core and network -------------------------- */}
      <Section
        tone="panel"
        eyebrow="Chart"
        title="The whole network on one plot."
        lede="Mercator, so a straight line is a true bearing. Every port is on here — brass where we deliver ourselves, teal where an appointed agent does. Hover a mark for its LOCODE."
      >
        <Reveal className="rounded-md border border-navy-600 bg-navy-900 p-4 lg:p-6">
          <WorldChart />
          <ChartLegend className="mt-6 px-1" />
        </Reveal>
      </Section>

      {/* --- Core regions: a card per port, each with a page -------------- */}
      {CORE_REGIONS.map((region, ri) => {
        const core = portsInRegion(region).filter((p) => p.tier === "core");
        const agents = networkByCountry(region);
        return (
          <Section
            key={region}
            id={region}
            tone={ri % 2 === 0 ? "navy" : "panel"}
            eyebrow={regionLabels[region]}
            title={`${regionLabels[region]} — ${portsInRegion(region).length} ports`}
          >
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {core.map((port, i) => (
                <Reveal key={port.slug} as="li" delay={(i % 3) * 50}>
                  <Link
                    href={`/ports/${port.slug}`}
                    className="group flex h-full flex-col rounded-md border border-navy-600 bg-navy-900 p-5 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-cream-50">
                        {port.name}
                      </h3>
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

            {/* Agent-served ports in the same region — listed, not detailed. */}
            {agents.length > 0 && (
              <Reveal delay={120} className="mt-10">
                <h3 className="eyebrow mb-5 text-slate-400">
                  Also served through local agents
                </h3>
                <CountryLists groups={agents} />
              </Reveal>
            )}
          </Section>
        );
      })}

      {/* --- The global network ------------------------------------------- */}
      <Section
        eyebrow="Global network"
        title="Agent-served ports worldwide."
        lede="Supplied and attended through appointed local agents, against the same requisition and the same paperwork. Quoted case by case — tell us the port and the window."
      >
        <div className="space-y-14">
          {/* Plain wrapper carries the anchor id — Reveal takes no id. */}
          {NETWORK_REGIONS.map((region) => (
            <div key={region} id={region} className="scroll-mt-24">
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-600 pb-4">
                  <h3 className="text-2xl lg:text-3xl">{regionLabels[region]}</h3>
                  <p className="font-mono text-xs text-brass-500">
                    {portsInRegion(region).length} ports
                  </p>
                </div>
                <div className="mt-6">
                  <CountryLists groups={networkByCountry(region)} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="measure mt-14 rounded-md border border-navy-600 bg-navy-800/60 px-5 py-4 text-sm text-cream-200">
            Calling somewhere not on this list? The network extends further
            than we publish. Send the port and the ETA and we will confirm
            whether we can cover it before you commit.
          </p>
        </Reveal>
      </Section>

      <QuoteCTA />
    </main>
  );
}

/**
 * Network ports grouped under a country heading. Tags rather than cards —
 * these ports have no detail page, so there is nothing to click through to,
 * and 127 cards would bury the core ports that do.
 */
function CountryLists({
  groups,
}: {
  groups: { country: string; ports: { slug: string; name: string; locode: string }[] }[];
}) {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.country}>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-cream-50">
            {group.country}
            <span className="ml-2 text-slate-400">{group.ports.length}</span>
          </h4>
          <ul className="flex flex-wrap gap-2">
            {group.ports.map((port) => (
              <li key={port.slug}>
                <PortTag code={port.locode} name={port.name} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
