import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "brass" | "teal" | "rust" | "neutral";

const tones: Record<Tone, string> = {
  brass: "border-brass-500/45 bg-brass-500/10 text-brass-400",
  teal: "border-teal-500/45 bg-teal-500/10 text-teal-500",
  rust: "border-rust-500/50 bg-rust-500/12 text-rust-500",
  neutral: "border-cream-50/20 bg-cream-50/5 text-cream-200",
};

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1",
        "font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  );
}
