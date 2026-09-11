import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { buttonClasses } from "@/components/ui/button";
import { photoIdFor, supplyCategories } from "@/data/site";

/**
 * §4.1 #6 — Supply categories. The centrepiece of the homepage.
 *
 * Photo-led cards, not icon cards: this is the single biggest visual upgrade
 * over the reference set (Royal Marine uses icons, Mahir uses photos, and
 * Mahir wins). Real photography drops into PhotoPlaceholder's slot.
 */
export function CategoryGrid() {
  return (
    <Section
      id="supplies"
      eyebrow="Ship supplies"
      title="Eleven catalogued categories."
      lede="Every category is published with IMPA codes, units of issue and current availability — so your purchasing team can quote straight from the page instead of waiting on a call back."
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {supplyCategories.map((c, i) => (
          <Reveal key={c.href} as="li" delay={(i % 4) * 60}>
            <Link
              href={c.href}
              className="group block overflow-hidden rounded-md border border-navy-600 transition-[border-color,transform] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500"
            >
              <Photo
                id={photoIdFor(c.href)}
                ratio="square"
                overlay
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />

              <div className="flex items-start justify-between gap-3 bg-navy-800 p-5">
                <div>
                  <h3 className="text-base font-semibold text-cream-50">
                    {c.label}
                  </h3>
                  {c.blurb && (
                    <p className="mt-1 text-xs leading-snug text-slate-400">
                      {c.blurb}
                    </p>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brass-500 transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Twelfth cell completes the 4-column grid rather than leaving a hole. */}
        <Reveal as="li" delay={180}>
          <Link
            href="/quote"
            className="flex h-full flex-col justify-between rounded-md border border-dashed border-brass-500/40 bg-navy-800/50 p-6 transition-colors hover:border-brass-500 hover:bg-navy-800"
          >
            <div>
              <p className="eyebrow text-brass-500">Not listed?</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight text-cream-50">
                We source to order.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Send the requisition and we will price it against your codes.
              </p>
            </div>
            <span className={buttonClasses({ variant: "outline", size: "sm", className: "mt-6 self-start" })}>
              Request a Quote
            </span>
          </Link>
        </Reveal>
      </ul>
    </Section>
  );
}
