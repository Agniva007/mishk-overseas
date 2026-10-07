import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ChartLegend, WorldChart } from "@/components/marine/world-chart";
import {
  countryCount,
  detailPorts,
  ports,
  portsInRegion,
  regionLabels,
  regionOrder,
} from "@/data/ports";

/** §4.1 #7 — Ports we serve. The whole network on one chart, then the index. */
export function PortsChart() {
  const own = detailPorts.filter((p) => p.active).length;

  return (
    <Section
      id="ports"
      eyebrow="Where we deliver"
      title={`${ports.length} ports, ${countryCount} countries.`}
      lede={`Every port we cover is on the chart. ${own} carry our own delivery on India's west and east coasts and at the UAE hubs; the rest are supplied and attended through appointed local agents — same requisition, same paperwork.`}
    >
      <Reveal className="rounded-md border border-navy-600 bg-navy-900 p-4 lg:p-6">
        <WorldChart />
        <ChartLegend className="mt-6 px-1" />
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {regionOrder.map((region) => (
            <li key={region}>
              <Link
                href={`/ports#${region}`}
                className="group flex h-full flex-col justify-between gap-3 rounded-md border border-navy-600 bg-navy-800 px-4 py-3.5 transition-colors hover:border-brass-500"
              >
                <span className="text-xs leading-snug text-cream-200">
                  {regionLabels[region]}
                </span>
                <span className="font-mono text-lg text-brass-500">
                  {portsInRegion(region).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={140}>
        <Link
          href="/ports"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brass-500 transition-colors hover:text-brass-400"
        >
          View all {ports.length} ports
          <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </Section>
  );
}
