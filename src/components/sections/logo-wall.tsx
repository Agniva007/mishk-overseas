import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { clients } from "@/data/home";

/**
 * §4.1 #10 — Clients & partners. George Marine proves this section converts:
 * named customers are the strongest trust signal a chandler has.
 *
 * ⚠️ Placeholder wordmarks. Real logos + written permission per ASSETS.md §6.
 */
export function LogoWall() {
  return (
    <Section
      eyebrow="Trusted by"
      title="Fleets and operators we supply."
      lede="Client names and marks are published with permission."
    >
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-navy-600 bg-navy-600 sm:grid-cols-4">
        {clients.map((name, i) => (
          <Reveal key={name} as="li" delay={(i % 4) * 50}>
            <div className="flex h-28 items-center justify-center bg-navy-800 px-4 transition-colors duration-200 hover:bg-navy-700">
              <span className="text-center font-display text-lg font-semibold tracking-tight text-slate-400 transition-colors duration-200 hover:text-brass-500">
                {name}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate-400">
        Placeholder wordmarks — awaiting client logos and permissions
      </p>
    </Section>
  );
}
