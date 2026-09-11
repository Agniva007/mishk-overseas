"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Replays the standard section-entrance motion: opacity 0→1, y 24px→0,
 * 600ms, ease-marine, children staggered 60ms. See IMPLEMENTATION.md §2.5.
 */
export function MotionDemo() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <div key={key} className="grid gap-4 sm:grid-cols-3">
        {["Enquiry received", "Quotation issued", "Delivered alongside"].map(
          (label, i) => (
            <Card
              key={label}
              className="animate-[marine-in_600ms_var(--ease-marine)_both] p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="font-mono text-xs text-brass-500">
                0{i + 1}
              </p>
              <p className="mt-2 text-sm text-cream-50">{label}</p>
            </Card>
          ),
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-6"
        onClick={() => setKey((k) => k + 1)}
      >
        Replay entrance
      </Button>
      <p className="mt-3 text-xs text-slate-400">
        Under <code className="font-mono text-cream-200">prefers-reduced-motion:
        reduce</code> this collapses to an instant appearance — try it in your OS
        accessibility settings.
      </p>
    </div>
  );
}
