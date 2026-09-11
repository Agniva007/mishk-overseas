import { ImageResponse } from "next/og";
import { OG, ogFonts } from "./og-font";
import { site } from "@/data/site";

/**
 * The standard Open Graph card. One layout, three call sites (root, supply
 * category, port) so the shared chrome — wordmark, grid, hairline — cannot
 * drift between them.
 */
export async function ogCard({
  eyebrow,
  title,
  meta,
  badge,
}: {
  eyebrow: string;
  title: string;
  /** Small facts along the bottom rule. */
  meta: string[];
  /** Optional mono chip beside the wordmark — used for LOCODEs. */
  badge?: string;
}) {
  const fonts = await ogFonts();
  const titleSize = title.length > 34 ? 62 : title.length > 22 ? 74 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG.navy,
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: OG.grid,
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={OG.brass} strokeWidth="1.75">
            <circle cx="12" cy="12" r="7.25" />
            <line x1="2.5" y1="12" x2="21.5" y2="12" />
          </svg>
          <div style={{ fontSize: 27, fontWeight: 600, color: OG.cream, fontFamily: "Fraunces", letterSpacing: "-0.01em" }}>
            {site.name}
          </div>
          {badge && (
            <div
              style={{
                display: "flex",
                marginLeft: 8,
                border: `1px solid ${OG.teal}`,
                color: OG.teal,
                borderRadius: 2,
                padding: "5px 12px",
                fontSize: 19,
                fontFamily: "Inter",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 17,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: OG.brass,
              fontWeight: 600,
              fontFamily: "Inter",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.02,
              color: OG.cream,
              letterSpacing: "-0.025em",
              maxWidth: 1000,
              fontFamily: "Fraunces",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Hairline + meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 120, height: 1, background: "rgba(242,237,227,0.25)" }} />
            <div style={{ width: 8, height: 8, background: OG.brass }} />
          </div>
          <div style={{ display: "flex", gap: 44, color: OG.slate, fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>
            {meta.map((m, i) => (
              <div key={m} style={{ display: "flex", gap: 44 }}>
                {i > 0 && <div style={{ display: "flex", color: OG.navy600 }}>/</div>}
                <div style={{ display: "flex" }}>{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...OG.size, fonts },
  );
}
