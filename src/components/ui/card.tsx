import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface. `interactive` adds the standard hover: lift 4px and the
 * border goes brass, 180ms. See IMPLEMENTATION.md §2.5.
 */
export function Card({
  interactive = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-md border border-navy-600 bg-navy-800",
        interactive &&
          "transition-[transform,border-color,background-color] duration-[180ms] ease-marine hover:-translate-y-1 hover:border-brass-500 hover:bg-navy-700",
        className,
      )}
      {...props}
    />
  );
}
