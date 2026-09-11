import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/home";

/** §4.1 #11 — Testimonials. Three cards, brass open-quote glyph. */
export function Testimonials() {
  return (
    <Section
      tone="panel"
      eyebrow="From the bridge"
      title="What crews and purchasers say."
    >
      <ul className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.quote} as="li" delay={i * 70} className="h-full">
            <Card className="flex h-full flex-col bg-navy-900 p-7">
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-brass-500"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1 text-cream-200">
                {t.quote}
              </blockquote>
              <footer className="mt-6 border-t border-navy-600 pt-4">
                <p className="text-sm font-semibold text-cream-50">{t.name}</p>
                <p className="font-mono text-xs text-slate-400">
                  {t.role} · {t.vessel}
                </p>
              </footer>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
