import { ogCard } from "@/lib/og-card";
import { OG } from "@/lib/og-font";
import { coastLabels, ports } from "@/data/ports";

export const alt = "Ship supply and marine technical services";
export const size = OG.size;
export const contentType = "image/png";

export function generateStaticParams() {
  return ports.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const port = ports.find((p) => p.slug === slug);

  if (!port) {
    return ogCard({
      eyebrow: "Ports we serve",
      title: "Ship supply across India and the Gulf",
      meta: ["21 ports", "24×7 supply desk"],
    });
  }

  return ogCard({
    eyebrow: `${coastLabels[port.coast]} · Ship chandling & technical services`,
    title: `Ship supply at ${port.name}`,
    badge: port.locode,
    meta: [
      port.leadTime,
      [port.alongside && "Alongside", port.anchorage && "Anchorage"]
        .filter(Boolean)
        .join(" & ") || "On request",
      port.active ? "Own delivery" : "Partner agent",
    ],
  });
}
