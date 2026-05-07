"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type StagePalette =
  | "travertino"
  | "carta"
  | "sepia"
  | "terracotta"
  | "salvia"
  | "notte"
  | "pompeiano";

/* Stage palettes — white · light blue · deep blue.
   Legacy keys (terracotta / salvia / pompeiano) collapse onto the new
   three-stop scheme so existing markup keeps working. */
const themes: Record<StagePalette, { bg: string; fg: string; accent: string }> = {
  travertino:  { bg: "#f5f7fb", fg: "#0f1622", accent: "#0f2a4a" }, // soft white
  carta:       { bg: "#ffffff", fg: "#0f1622", accent: "#0f2a4a" }, // pure white
  sepia:       { bg: "#0f1622", fg: "#f5f7fb", accent: "#a7c0e0" }, // ink
  terracotta:  { bg: "#d6e3f4", fg: "#0f1622", accent: "#0f2a4a" }, // → light blue
  salvia:      { bg: "#e8eef8", fg: "#0f1622", accent: "#0f2a4a" }, // → very light blue
  notte:       { bg: "#0f2a4a", fg: "#ffffff", accent: "#a7c0e0" }, // deep blue
  pompeiano:   { bg: "#0f2a4a", fg: "#ffffff", accent: "#a7c0e0" }, // → deep blue
};

type Props = {
  palette: StagePalette;
  children: React.ReactNode;
  className?: string;
};

/**
 * ScrollStage — paints the <body> background + foreground CSS vars while this
 * section dominates the viewport (>= 40% visible). On deactivation or unmount
 * it removes the vars entirely, so the default palette snaps back.
 *
 * This avoids the "stage leak" where the last-active palette persists across
 * route changes (e.g. home page's terracotta closing bleeding onto /progetti).
 */
export function ScrollStage({ palette, children, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const theme = themes[palette];

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!active || reduce) return;
    const body = document.body;
    body.style.setProperty("--stage-bg", theme.bg);
    body.style.setProperty("--stage-fg", theme.fg);
    body.style.setProperty("--stage-accent", theme.accent);
    return () => {
      body.style.removeProperty("--stage-bg");
      body.style.removeProperty("--stage-fg");
      body.style.removeProperty("--stage-accent");
    };
  }, [active, reduce, theme.bg, theme.fg, theme.accent]);

  return (
    <motion.section
      ref={ref}
      data-stage={palette}
      animate={{ backgroundColor: theme.bg, color: theme.fg }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
      style={{ backgroundColor: theme.bg, color: theme.fg }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
}
