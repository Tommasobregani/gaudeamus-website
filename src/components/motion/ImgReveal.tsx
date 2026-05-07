"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Direction of the clip reveal sweep. */
  from?: "bottom" | "top" | "left" | "right";
  /**
   * If true, also runs a slow Ken-Burns scale-down on direct <img> / <Image>
   * children while in the viewport (1.18 → 1.04 settle).
   */
  parallax?: boolean;
};

const insets = {
  bottom: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  top:    { from: "inset(0 0 100% 0)", to: "inset(0% 0 0 0)" },
  left:   { from: "inset(0 100% 0 0)", to: "inset(0% 0 0 0)" },
  right:  { from: "inset(0 0 0 100%)", to: "inset(0% 0 0 0)" },
} as const;

/**
 * ImgReveal — the Hendricks Gin Palace pattern.
 *
 *   1. Wrapper figure starts clipped (`clip-path: inset(100% 0 0 0)`).
 *   2. On viewport entry, the clip animates open (1.1s, ease).
 *   3. The inner image simultaneously scales down (1.18 → 1.04) and
 *      slowly settles while the section is in view — a parallax Ken Burns.
 *   4. Pure CSS `clip-path` + transform — no layout thrash, GPU only.
 *
 * Wrap any photo container with this for a premium scroll reveal.
 */
export function ImgReveal({
  children,
  className,
  from = "bottom",
  parallax = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const inset = insets[from];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.06, 1.0]);
  const innerY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  if (reduce) {
    return <figure className={className}>{children}</figure>;
  }

  return (
    <motion.figure
      ref={ref}
      initial={{ clipPath: inset.from, opacity: 0 }}
      whileInView={{ clipPath: inset.to, opacity: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        clipPath: { duration: 1.1, ease: [0.77, 0, 0.175, 1] },
        opacity: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
      }}
      className={`will-change-[clip-path] ${className ?? ""}`}
    >
      {parallax ? (
        <motion.div style={{ scale: innerScale, y: innerY }} className="h-full w-full">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.figure>
  );
}
