import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { WaveEdge } from "@/components/marine/wave-edge";
import { whyUs } from "@/data/home";

/**
 * §4.1 #9 — Why Mishk. The first light break in the page, entered through the
 * wave-cut edge. Note brass-700 throughout: brass-500 fails contrast on paper
 * (2.30:1 — see §2.7).
 */
export function WhyUs() {
  return (
    <>
      <WaveEdge />
      <Section
        tone="paper"
        eyebrow="Why Mishk"
        title="One window for the whole requisition."
        lede="What a purchasing team actually needs from a chandler is fewer parties to chase and fewer surprises on receipt."
      >
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 60}>
              <div className="flex items-start gap-4">
                {/* Plimsoll bullet, brass-700 for the paper ground */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-brass-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="7.25" />
                  <line x1="2.5" y1="12" x2="21.5" y2="12" />
                </svg>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-900/70">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <div className="bg-paper-50">
        <WaveEdge fill="text-navy-900" flip />
      </div>
    </>
  );
}
