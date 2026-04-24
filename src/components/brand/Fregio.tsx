"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Typographic fregio — the Italian ornamental divider.
 * A filet + rhombus + filet, path-drawn on scroll into view.
 * Swap the inner <svg> to change the ornament; every section reuses the same component.
 */
type Props = {
  className?: string;
  width?: number;
  tone?: "ink" | "terracotta" | "cream";
};

export function Fregio({ className, width = 240, tone = "ink" }: Props) {
  const stroke =
    tone === "terracotta"
      ? "var(--color-terracotta)"
      : tone === "cream"
      ? "var(--color-travertino)"
      : "var(--color-sepia)";

  return (
    <motion.svg
      role="presentation"
      aria-hidden
      width={width}
      height="14"
      viewBox="0 0 240 14"
      fill="none"
      className={cn("block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {/* left filet */}
      <motion.line
        x1="0"
        y1="7"
        x2="98"
        y2="7"
        stroke={stroke}
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.2, 0.7, 0.1, 1] },
          },
        }}
      />
      {/* central diamond */}
      <motion.polygon
        points="120,1 128,7 120,13 112,7"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.4, ease: [0.2, 0.7, 0.1, 1] },
          },
        }}
      />
      {/* inner diamond dot */}
      <motion.circle
        cx="120"
        cy="7"
        r="1.6"
        fill={stroke}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.35, delay: 0.75 },
          },
        }}
        style={{ transformOrigin: "120px 7px" }}
      />
      {/* right filet */}
      <motion.line
        x1="142"
        y1="7"
        x2="240"
        y2="7"
        stroke={stroke}
        strokeWidth="1"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.2, 0.7, 0.1, 1] },
          },
        }}
      />
    </motion.svg>
  );
}

/**
 * A small asterism — three dots arranged as a triangle — used inline between words.
 */
export function Asterism({ className, tone = "ink" }: { className?: string; tone?: Props["tone"] }) {
  const fill =
    tone === "terracotta"
      ? "var(--color-terracotta)"
      : tone === "cream"
      ? "var(--color-travertino)"
      : "var(--color-sepia)";

  return (
    <svg
      role="presentation"
      aria-hidden
      width="22"
      height="14"
      viewBox="0 0 22 14"
      className={cn("inline-block align-middle opacity-60", className)}
    >
      <circle cx="4" cy="10" r="1.2" fill={fill} />
      <circle cx="11" cy="4" r="1.2" fill={fill} />
      <circle cx="18" cy="10" r="1.2" fill={fill} />
    </svg>
  );
}
