import { cn } from "@/lib/utils";

/**
 * Renders where content exists in the template but the underlying claim has
 * not been supplied by the client — equipment specs, case notes, certificates.
 *
 * The alternative is inventing the claim, which for capability and
 * track-record content a buyer would rely on is not acceptable. This makes the
 * gap visible instead of filling it.
 */
export function PendingPanel({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-brass-500/35 bg-brass-500/[0.05] p-6",
        className,
      )}
    >
      <p className="eyebrow mb-2 text-brass-400">Pending client detail</p>
      <p className="font-display text-xl font-semibold text-cream-50">
        {title}
      </p>
      <p className="measure mt-2 text-sm leading-relaxed text-cream-200">
        {body}
      </p>
    </div>
  );
}
