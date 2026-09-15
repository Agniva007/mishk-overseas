import { ogCard } from "@/lib/og-card";
import { OG } from "@/lib/og-font";
import { spares } from "@/data/spares";

export const alt = "Marine spares category";
export const size = OG.size;
export const contentType = "image/png";

export function generateStaticParams() {
  return spares.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = spares.find((c) => c.slug === category);

  if (!data) {
    return ogCard({
      eyebrow: "Marine spares",
      title: "Parts identified by nameplate",
      meta: ["15 categories", "24×7 supply desk"],
    });
  }

  return ogCard({
    eyebrow: `Marine spares · ${data.tagline}`,
    title: data.name,
    meta: [
      `${data.items.length} lines`,
      data.makers.slice(0, 2).join(" · "),
      "Genuine or equivalent",
    ],
  });
}
