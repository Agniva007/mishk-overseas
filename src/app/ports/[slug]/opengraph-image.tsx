import { ogCard } from "@/lib/og-card";
import { OG } from "@/lib/og-font";
import { countryCount, detailPorts, ports, regionLabels } from "@/data/ports";

export const alt = "Ship supply and marine technical services";
export const size = OG.size;
export const contentType = "image/png";

export function generateStaticParams() {
  return detailPorts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const port = detailPorts.find((p) => p.slug === slug);

  if (!port) {
    return ogCard({
      eyebrow: "Ports we serve",
      title: "Ship supply across India, the Gulf and the world's trade lanes",
      meta: [`${ports.length} ports`, `${countryCount} countries`, "24×7 supply desk"],
    });
  }

  return ogCard({
    eyebrow: `${regionLabels[port.region]} · Ship chandling & technical services`,
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
