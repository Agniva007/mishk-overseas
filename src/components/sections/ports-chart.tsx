import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PortTag } from "@/components/marine/port-tag";
import { PortChart } from "@/components/marine/port-chart";
import { coastLabels, ports, type Coast } from "@/data/ports";

/** §4.1 #7 — Ports we serve. Chart plot left, grouped list right. */
export function PortsChart() {
  const byCoast = (coast: Coast) => ports.filter((p) => p.coast === coast);

  return (
    <Section
      id="ports"
      eyebrow="Where we deliver"
      title="Ports we serve."
      lede="Supply available now shown in brass; ports marked on request are served through partner agents. Hover a dot for its LOCODE."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal className="rounded-md border border-navy-600 bg-navy-900 p-4 lg:p-6">
          <PortChart />
        </Reveal>

        <Reveal delay={80} className="space-y-8">
          {(["west", "east", "gulf"] as const).map((coast) => (
            <div key={coast}>
              <h3 className="eyebrow mb-4 font-sans text-brass-500">
                {coastLabels[coast]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {byCoast(coast).map((port) => (
                  <li key={port.slug}>
                    <Link href={`/ports/${port.slug}`}>
                      <PortTag
                        code={port.locode}
                        name={port.name}
                        active={port.active}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link
            href="/ports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brass-500 transition-colors hover:text-brass-400"
          >
            View all ports
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
