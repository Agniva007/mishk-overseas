import { cn } from "@/lib/utils";
import { Container } from "./container";
import { HairlineRule } from "@/components/marine/hairline-rule";
import { Reveal } from "@/components/motion/reveal";

/**
 * Standard section shell: vertical rhythm py-20 → py-32 (§2.3), optional
 * eyebrow + heading block, and the entrance reveal.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  containerClassName,
  align = "left",
  tone = "navy",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
  tone?: "navy" | "panel" | "paper";
}) {
  const tones = {
    navy: "bg-navy-900 text-cream-50",
    panel: "bg-navy-800 text-cream-50",
    paper: "bg-paper-50 text-ink-900",
  };

  const isPaper = tone === "paper";

  return (
    <section id={id} className={cn("py-20 lg:py-32", tones[tone], className)}>
      <Container className={containerClassName}>
        {(eyebrow || title) && (
          <Reveal className={cn("mb-12 lg:mb-16", align === "center" && "text-center")}>
            {eyebrow && (
              <p
                className={cn(
                  "eyebrow mb-3",
                  isPaper ? "text-brass-700" : "text-brass-500",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="max-w-3xl text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            <HairlineRule
              className={cn("mt-6", align === "center" && "justify-center")}
              width="w-20"
            />
            {lede && (
              <p
                className={cn(
                  "measure mt-6 text-lg",
                  align === "center" && "mx-auto",
                  isPaper ? "text-ink-900/70" : "text-cream-200",
                )}
              >
                {lede}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
