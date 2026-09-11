"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` px. Drives the header's
 * transparent → solid transition. See IMPLEMENTATION.md §4.1.
 */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
