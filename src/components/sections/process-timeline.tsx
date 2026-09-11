import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { process } from "@/data/home";

/**
 * §4.1 #8 — How we work. Sets service expectations and pre-answers the
 * buyer's first question: "how fast do I get a price?"
 */
export function ProcessTimeline() {
  return (
    <Section
      eyebrow="How we work"
      title="Requisition to delivery, in four steps."
    >
      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {/* The brass hairline the steps sit on, desktop only. */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-3 hidden h-px bg-gradient-to-r from-brass-500/60 via-brass-500/30 to-transparent lg:block"
        />

        {process.map((s, i) => (
          <Reveal key={s.step} as="li" delay={i * 70} className="relative lg:pt-12">
            {/* Sits centred on the hairline at top-3 (12px). */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-[9px] hidden size-1.5 bg-brass-500 lg:block"
            />
            <p className="font-mono text-xs tracking-[0.14em] text-brass-500">
              {s.step}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-cream-50">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {s.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
