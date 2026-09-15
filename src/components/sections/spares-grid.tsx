import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { allMakers, spares, totalSpareLines } from "@/data/spares";

/**
 * Homepage spares section.
 *
 * Deliberately NOT another photo grid — the supplies section directly above is
 * one, and two in a row reads as a single long grid. This one is typographic,
 * which also suits spares: the buyer is scanning for an equipment name, not
 * browsing pictures.
 */
export function SparesGrid() {
  return (
    <Section
      id="spares"
      tone="panel"
      eyebrow="Marine spares"
      title="Parts identified by nameplate."
      lede={`${spares.length} equipment categories covering ${totalSpareLines}+ published lines. Send the maker, type and part number — we quote genuine, OEM-equivalent and reconditioned side by side, and never substitute one for another silently.`}
    >
      <ul className="grid gap-px overflow-hidden rounded-md border border-navy-600 bg-navy-600 sm:grid-cols-2 lg:grid-cols-3">
        {spares.map((c, i) => (
          <Reveal key={c.slug} as="li" delay={(i % 3) * 40}>
            <Link
              href={`/spares/${c.slug}`}
              className="group flex h-full flex-col justify-between bg-navy-900 p-5 transition-colors duration-[180ms] hover:bg-navy-700"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-cream-50">
                    {c.name.replace(/ Spares$/, "")}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-brass-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{c.tagline}</p>
              </div>
              <p className="mt-4 font-mono text-[0.625rem] leading-relaxed text-slate-400/80">
                {c.makers.slice(0, 3).join(" · ")}
                <span className="text-brass-500/70"> · {c.items.length} lines</span>
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-4">
        <Link href="/spares" className={buttonClasses()}>
          Browse all spares
        </Link>
        <p className="font-mono text-xs text-slate-400">
          {allMakers.length} makes sourced for
        </p>
      </Reveal>
    </Section>
  );
}
