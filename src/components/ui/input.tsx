import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-md border border-navy-600 bg-navy-900 px-3.5 py-2.5 text-cream-50 " +
  "placeholder:text-slate-400/60 transition-colors " +
  "hover:border-navy-600 focus:border-brass-500 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 " +
  "disabled:opacity-40";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-11", className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-28 resize-y", className)} {...props} />;
}

/** Real label. Never placeholder-as-label. See §2.7. */
export function Label({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "eyebrow mb-2 block text-brass-500",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
