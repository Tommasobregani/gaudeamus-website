"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * StageReset — belt-and-braces cleanup for ScrollStage.
 *
 * Whenever the route changes, it clears any lingering --stage-* CSS variables
 * from <body>. This prevents the home page's closing terracotta act from
 * bleeding onto /progetti, /chi-siamo, etc. when the user navigates away
 * mid-scroll (before the ScrollStage had a chance to deactivate).
 */
export function StageReset() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.style.removeProperty("--stage-bg");
    body.style.removeProperty("--stage-fg");
    body.style.removeProperty("--stage-accent");
  }, [pathname]);

  return null;
}
