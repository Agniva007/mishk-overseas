import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PlimsollBullet } from "@/components/marine/plimsoll-bullet";
import { Photo } from "@/components/media/photo";
import { disciplines } from "@/data/home";

/**
 * §4.1 #5 — Two disciplines. The clearest possible statement of what the
 * company does, directly under the proof bar.
 */
export function Disciplines() {
  return (
    <Section
      eyebrow="What we do"
      title="Two disciplines, one point of contact."
      lede="Most vessels need both a chandler and a repair contractor. Running them through one supplier removes a handover — and a party to chase when something slips."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {disciplines.map((d, i) => (
          <Reveal key={d.title} delay={i * 80} as="article">
            <Link
              href={d.href}
              className="group flex h-full flex-col overflow-hidden rounded-md border border-navy-600 bg-navy-800 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
            >
              <Photo
                id={d.photo}
                ratio="wide"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="border-b border-navy-600"
              />

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl font-semibold tracking-tight text-cream-50">
                  {d.title}
                </h3>
                <p className="mt-3 text-cream-200">{d.blurb}</p>

                <ul className="mt-6 space-y-2.5">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <PlimsollBullet className="mt-0.5 size-4 shrink-0 text-brass-500" />
                      <span className="text-sm text-cream-200">{p}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brass-500 transition-colors group-hover:text-brass-400">
                  Explore {d.title.toLowerCase()}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
