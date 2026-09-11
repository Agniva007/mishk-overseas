import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "brass" | "outline" | "ghost" | "teal";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  /* Primary. The only filled-brass element on a given screen. */
  brass:
    "bg-brass-500 text-navy-900 hover:bg-brass-400 active:bg-brass-500 font-semibold",
  /* Secondary. Cream hairline, fills faintly on hover. */
  outline:
    "border border-cream-50/30 text-cream-50 hover:border-brass-500 hover:text-brass-500 hover:bg-brass-500/5",
  /* Tertiary. Text-only, brass on hover. */
  ghost: "text-cream-200 hover:text-brass-500 hover:bg-cream-50/5",
  /* Signal. Used only for in-stock / availability actions. */
  teal: "bg-teal-500 text-cream-50 hover:bg-teal-500/85 font-semibold",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-6 text-sm gap-2.5",
  lg: "h-13 px-8 text-base gap-3",
};

/**
 * Shared class builder. Use this on `<Link>` so anchors get identical styling
 * without nesting an <a> inside a <button>.
 */
export function buttonClasses({
  variant = "brass",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-sm transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant = "brass",
  size = "md",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props} />
  );
}
