import { getPhoto } from "@/data/photos";
import { PhotoPlaceholder } from "./photo-placeholder";
import { cn } from "@/lib/utils";

/**
 * A sourced photograph. AVIF with a WebP fallback, two widths, and a 20px
 * blurred placeholder inlined behind it so cards never flash empty.
 *
 * The container sets the aspect ratio and the image covers it, so one square
 * source can serve both a square card and a wide one without re-encoding.
 *
 * Falls back to <PhotoPlaceholder> for any id with no photograph yet, which
 * keeps the gap visible rather than rendering a blank box.
 */
export function Photo({
  id,
  className,
  ratio = "square",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  overlay = false,
}: {
  id: string;
  className?: string;
  ratio?: "square" | "wide" | "portrait" | "fill";
  sizes?: string;
  /** Set on the hero only — everything else lazy-loads. */
  priority?: boolean;
  /** The navy scrim used on category cards (§2.6). */
  overlay?: boolean;
}) {
  const photo = getPhoto(id);

  if (!photo) {
    return <PhotoPlaceholder label={id} ratio={ratio} className={className} />;
  }

  const ratios = {
    square: "aspect-square",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    fill: "h-full w-full",
  };

  const srcset = (ext: "avif" | "webp") =>
    photo.widths.map((w) => `/img/${photo.id}-${w}.${ext} ${w}w`).join(", ");

  const largest = photo.widths[0];

  return (
    <div
      className={cn("relative overflow-hidden bg-navy-800", ratios[ratio], className)}
    >
      {/* LQIP sits behind, scaled up and blurred. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center blur-lg"
        style={{ backgroundImage: `url("${photo.lqip}")` }}
      />

      <picture>
        <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
        <img
          src={`/img/${photo.id}-${largest}.webp`}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          className="absolute inset-0 size-full object-cover"
        />
      </picture>

      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/45 transition-colors duration-[180ms] group-hover:bg-navy-900/20"
        />
      )}
    </div>
  );
}
