"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — single Lenis instance for the whole site.
 * Lerp 0.08, duration 1.2 (matches the Northfold/archi-site reference).
 * Disabled when prefers-reduced-motion is active. Touch keeps native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      touchMultiplier: 1.4,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
