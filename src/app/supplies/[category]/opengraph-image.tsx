import { ogCard } from "@/lib/og-card";
import { OG } from "@/lib/og-font";
import { supplies } from "@/data/supplies";

export const alt = "Ship supply category";
export const size = OG.size;
export const contentType = "image/png";

export function generateStaticParams() {
  return supplies.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = supplies.find((c) => c.slug === category);

  if (!data) {
    return ogCard({
      eyebrow: "Ship supplies",
      title: "Eleven catalogued categories",
      meta: ["198 published lines", "24×7 supply desk"],
    });
  }

  const inStock = data.items.filter((i) => i.availability === "stock").length;

  return ogCard({
    eyebrow: `Ship supplies · ${data.tagline}`,
    title: data.name,
    meta: [`${data.items.length} lines`, `${inStock} in stock`, "Delivered alongside"],
  });
}
