import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { Photo } from "@/components/media/photo";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Credits & Attribution",
  description:
    "Attribution for the photography and map data used on this site, with source and licence for each.",
  alternates: { canonical: "/credits" },
};

/**
 * Attribution page.
 *
 * ⚠️ THIS PAGE IS A LICENCE CONDITION, not a courtesy. Several images are
 * CC BY or CC BY-SA, which require author, licence and source to be credited.
 * Removing this page, or an entry from it, breaches those licences.
 */
export default function CreditsPage() {
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden border-b border-navy-600">
        <ChartGrid />
        <Container className="relative py-14 lg:py-20">
          <Breadcrumb
            className="mb-8"
            items={[{ label: "Home", href: "/" }, { label: "Credits" }]}
          />
          <p className="eyebrow mb-4 text-brass-500">Attribution</p>
          <h1 className="text-4xl lg:text-5xl">Credits &amp; attribution.</h1>
          <HairlineRule className="my-8" width="w-20" />
          <div className="measure space-y-4 text-cream-200">
            <p>
              The photographs on this site are licensed stock images from
              Wikimedia Commons, credited below with their author, licence and
              source as those licences require.
            </p>
            <p className="rounded-md border border-brass-500/30 bg-brass-500/[0.06] px-5 py-4 text-sm">
              <strong className="font-semibold text-brass-400">
                These are illustrative images.
              </strong>{" "}
              They are not photographs of Mishk Overseas&rsquo; own premises,
              stock, staff or vessels, and are not presented as such anywhere on
              this site.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li
                key={p.id}
                className="overflow-hidden rounded-md border border-navy-600 bg-navy-800"
              >
                <Photo
                  id={p.id}
                  ratio="wide"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-5">
                  <p className="font-mono text-xs text-brass-500">{p.id}</p>
                  <p className="mt-2 text-sm leading-snug text-cream-50">
                    {p.title}
                  </p>
                  <dl className="mt-3 space-y-1 text-xs">
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-slate-400">Author</dt>
                      <dd className="text-cream-200">{p.author}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 text-slate-400">Licence</dt>
                      <dd>
                        {p.licenseUrl ? (
                          <a
                            href={p.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer license"
                            className="text-teal-300 underline-offset-2 hover:underline"
                          >
                            {p.license}
                          </a>
                        ) : (
                          <span className="text-cream-200">{p.license}</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs text-brass-500 transition-colors hover:text-brass-400"
                  >
                    Source on Wikimedia Commons →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* --- Map data ----------------------------------------------------- */}
      <section className="border-t border-navy-600 py-14 lg:py-20">
        <Container>
          <p className="eyebrow mb-4 text-brass-500">Map data</p>
          <h2 className="text-2xl lg:text-3xl">The port chart.</h2>
          <HairlineRule className="my-7" width="w-20" />
          <div className="measure space-y-4 text-cream-200">
            <p>
              The coastline on the port chart is{" "}
              <a
                href="https://www.naturalearthdata.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass-500 underline-offset-4 transition-colors hover:text-brass-400 hover:underline"
              >
                Natural Earth
              </a>{" "}
              1:110m land, simplified for the plot. Natural Earth is in the
              public domain and asks for no attribution; it is credited here
              because knowing where a chart&rsquo;s geometry came from is the
              sort of thing our trade cares about.
            </p>
            <p>
              Port positions are real published coordinates and UN/LOCODEs. The
              plot is Mercator, so a straight line on it is a constant bearing.
              The trade lanes drawn between hubs are indicative routes, not
              surveyed tracks, and nothing on the chart should be used for
              navigation.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
