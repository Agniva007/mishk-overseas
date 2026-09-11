import { cn } from "@/lib/utils";

/**
 * Motif 6 — Port tag.
 * A UN/LOCODE in mono inside a 1px teal outline chip. Used on the ports map
 * and in supply-capability lists.
 */
export function PortTag({
  code,
  name,
  active = false,
  className,
}: {
  code: string;
  name?: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-2 py-1 font-mono text-xs tracking-wider transition-colors",
        active
          ? "border-teal-500 bg-teal-500/15 text-teal-500"
          : "border-teal-500/40 text-cream-200 hover:border-teal-500 hover:text-teal-500",
        className,
      )}
    >
      {active && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-teal-500"
        />
      )}
      {code}
      {name && (
        <span className="font-sans text-[0.6875rem] tracking-normal text-slate-400">
          {name}
        </span>
      )}
    </span>
  );
}
