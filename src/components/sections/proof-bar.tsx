import { Container } from "@/components/layout/container";
import { DepthStat } from "@/components/marine/depth-stat";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";

/** §4.1 #4 — Proof bar. Four depth-sounding numerals, counted up on scroll. */
export function ProofBar() {
  return (
    <section
      aria-label="Company figures"
      className="border-b border-navy-600 bg-navy-800 py-14"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} as="li" delay={i * 60}>
              <DepthStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
