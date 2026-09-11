import { ogCard } from "@/lib/og-card";
import { OG } from "@/lib/og-font";
import { site } from "@/data/site";
import { supplies, totalItems } from "@/data/supplies";
import { ports } from "@/data/ports";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG.size;
export const contentType = "image/png";

/** Default card for every route without its own. */
export default async function Image() {
  return ogCard({
    eyebrow: "Ship Chandling & Marine Technical Services",
    title: "Supplying the world’s fleet, port after port.",
    meta: [
      `${ports.length} ports`,
      `${totalItems} catalogued lines`,
      `${supplies.length} categories`,
    ],
  });
}
