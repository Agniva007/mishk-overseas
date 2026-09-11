import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { Photo } from "@/components/media/photo";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photography Credits",
  description:
    "Attribution for the photography used on this site, with source and licence for each image.",
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
          <h1 className="text-4xl lg:text-5xl">Photography credits.</h1>
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
    </main>
  );
}
