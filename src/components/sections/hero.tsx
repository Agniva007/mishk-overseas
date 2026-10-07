import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompassRose } from "@/components/marine/compass-rose";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { ChartGrid } from "@/components/marine/chart-grid";
import { Photo } from "@/components/media/photo";
import { countryCount, ports } from "@/data/ports";

/**
 * §4.1 #3 — Hero. min-h-[88vh], never a full 100vh.
 *
 * The real hero photograph (supply vessel alongside at night — ASSETS.md §5)
 * drops into the marked slot below with a left-to-right navy scrim so the
 * cream headline keeps ≥7:1 contrast. Until then the ground is the chart
 * grid, which is the same treatment the scrim would produce anyway.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-navy-600">
      {/* --- Background ---------------------------------------------------
          The scrim runs left-to-right so the cream headline keeps well over
          7:1 against it; §2.6. */}
      <Photo
        id="hero"
        ratio="fill"
        priority
        sizes="100vw"
        className="absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-navy-900)_0%,rgba(10,27,42,0.92)_45%,rgba(10,27,42,0.72)_100%)]"
      />
      <ChartGrid className="opacity-100" />
      <CompassRose className="absolute -right-28 -top-32 size-[36rem] text-cream-50/[0.05] lg:size-[48rem]" />

      <Container className="relative py-24">
        <p className="eyebrow mb-5 text-brass-500">
          Ship Chandling &amp; Marine Technical Services
        </p>

        <h1 className="max-w-4xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
          Supplying the world&rsquo;s fleet, port after port.
        </h1>

        <HairlineRule className="my-8" width="w-28" />

        <p className="measure text-lg text-cream-200">
          Provisions, bonded stores and engine spares alongside — plus repair
          teams, workshop jobs and riding squads. One window for the whole
          requisition, answered by a desk that runs around the clock.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/quote" className={buttonClasses({ size: "lg" })}>
            Request a Quote
          </Link>
          <Link
            href="/supplies"
            className={buttonClasses({ variant: "outline", size: "lg" })}
          >
            Browse Supplies
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          {/* Read from the data, not typed in — see the port count note in
              @/data/ports. */}
          <Badge tone="teal" dot>{ports.length} Global Ports</Badge>
          <Badge tone="neutral">{countryCount} Countries</Badge>
          <Badge tone="neutral">24/7 Response</Badge>
        </div>
      </Container>
    </section>
  );
}
