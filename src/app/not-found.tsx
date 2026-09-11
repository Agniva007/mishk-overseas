import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonClasses } from "@/components/ui/button";
import { CompassRose } from "@/components/marine/compass-rose";
import { ChartGrid } from "@/components/marine/chart-grid";
import { HairlineRule } from "@/components/marine/hairline-rule";

export default function NotFound() {
  return (
    <main id="main" className="relative flex flex-1 items-center overflow-hidden">
      <ChartGrid />
      <CompassRose className="absolute -right-28 top-1/2 size-[34rem] -translate-y-1/2 text-cream-50/[0.05]" />
      <Container className="relative py-28">
        <p className="eyebrow mb-4 text-brass-500">Error 404</p>
        <h1 className="max-w-2xl text-5xl lg:text-6xl">
          Off the chart.
        </h1>
        <HairlineRule className="my-8" width="w-24" />
        <p className="measure text-lg text-cream-200">
          That page is not on any of our sailing directions. The supply
          catalogue and the ports list are the two places most people are
          looking for.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/supplies" className={buttonClasses({ size: "lg" })}>
            Browse Supplies
          </Link>
          <Link
            href="/"
            className={buttonClasses({ variant: "outline", size: "lg" })}
          >
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}
