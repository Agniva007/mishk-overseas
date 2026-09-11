import { cn } from "@/lib/utils";

/**
 * Stand-in for photography that has not been delivered yet (see ASSETS.md).
 *
 * Deliberately reads as a placeholder rather than imitating a photo: navy
 * field, chart graticule, the subject's initial, and a mono "PHOTO PENDING"
 * tag. Layout and contrast are therefore realistic while it stays obvious
 * that the asset is missing.
 *
 * Replace with <Image> once real photography lands.
 */
export function PhotoPlaceholder({
  label,
  className,
  ratio = "square",
  showTag = true,
}: {
  label: string;
  className?: string;
  ratio?: "square" | "wide" | "portrait" | "fill";
  showTag?: boolean;
}) {
  const ratios = {
    square: "aspect-square",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    fill: "h-full w-full",
  };

  const initial = label.trim().charAt(0).toUpperCase();

  return (
    <div
      role="img"
      aria-label={`Placeholder image — photography pending for ${label}`}
      className={cn(
        "relative overflow-hidden bg-navy-800",
        ratios[ratio],
        className,
      )}
    >
      {/* Graticule */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,237,227,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,237,227,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Depth gradient, so overlaid text has something to sit on */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy-700/60 via-navy-800 to-navy-900"
      />

      {/* Subject initial */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-display text-[5rem] font-semibold leading-none text-cream-50/[0.07]"
      >
        {initial}
      </span>

      {showTag && (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 rounded-sm border border-brass-500/30 bg-navy-900/70 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-brass-500/80"
        >
          Photo pending
        </span>
      )}
    </div>
  );
}
