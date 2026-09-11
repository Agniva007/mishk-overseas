import * as React from "react";
import { cn } from "@/lib/utils";
import { HairlineRule } from "@/components/marine/hairline-rule";

/* ---------- Styleguide-local scaffolding ---------------------------------- */

export function Section({
  id,
  index,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 lg:py-24", className)}>
      <header className="mb-10">
        <p className="eyebrow mb-3 flex items-center gap-3 text-brass-500">
          <span className="font-mono">{index}</span>
          <HairlineRule width="w-8" />
        </p>
        <h2 className="text-4xl lg:text-5xl">{title}</h2>
        {intro && (
          <p className="measure mt-4 text-cream-200">{intro}</p>
        )}
      </header>
      {children}
    </section>
  );
}

export function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
      {children}
    </h3>
  );
}

/** A bordered demo stage — makes it obvious where a component's box ends. */
export function Stage({
  children,
  className,
  label,
  paper = false,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
  paper?: boolean;
}) {
  return (
    <div className="rounded-md border border-navy-600">
      {label && (
        <div className="border-b border-navy-600 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate-400">
          {label}
        </div>
      )}
      <div
        className={cn(
          "p-6 lg:p-8",
          paper ? "bg-paper-50 text-ink-900" : "bg-navy-800",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Colour ---------------------------------------------------------- */

export function Swatch({
  name,
  hex,
  role,
  className,
}: {
  name: string;
  hex: string;
  role: string;
  className?: string;
}) {
  return (
    <div className="group">
      <div
        className={cn(
          "h-20 w-full rounded-md border border-cream-50/12 transition-transform duration-[180ms] ease-marine group-hover:-translate-y-1",
          className,
        )}
        style={{ backgroundColor: hex }}
      />
      <p className="mt-3 font-sans text-sm font-semibold text-cream-50">{name}</p>
      <p className="font-mono text-xs uppercase text-brass-500">{hex}</p>
      <p className="mt-1 text-xs leading-snug text-slate-400">{role}</p>
    </div>
  );
}

/* ---------- Contrast table -------------------------------------------------- */

export function ContrastRow({
  fg,
  bg,
  ratio,
  verdict,
  note,
}: {
  fg: string;
  bg: string;
  ratio: number;
  verdict: "body" | "large" | "fail";
  note?: string;
}) {
  const chip = {
    body: { label: "AA body", cls: "border-teal-500/50 bg-teal-500/12 text-teal-300" },
    large: { label: "Large / UI only", cls: "border-brass-500/50 bg-brass-500/12 text-brass-400" },
    fail: { label: "Do not use as text", cls: "border-rust-500/60 bg-rust-500/15 text-rust-300" },
  }[verdict];

  return (
    <tr className="border-b border-navy-600 last:border-0">
      <td className="py-3 pr-4 font-mono text-xs text-cream-50">{fg}</td>
      <td className="py-3 pr-4 font-mono text-xs text-slate-400">{bg}</td>
      <td className="py-3 pr-4 text-right font-mono text-xs tabular-nums text-cream-50">
        {ratio.toFixed(2)}:1
      </td>
      <td className="py-3 pr-4">
        <span
          className={cn(
            "inline-block whitespace-nowrap rounded-sm border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider",
            chip.cls,
          )}
        >
          {chip.label}
        </span>
      </td>
      <td className="py-3 text-xs leading-snug text-slate-400">{note}</td>
    </tr>
  );
}
