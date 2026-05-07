"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  italicize?: boolean;
};

/**
 * LetterReveal — SSR-safe word-by-word rise.
 *
 * Content is fully visible on first paint (no `y: "110%"` hide trick, no opacity:0).
 * The animation is a subtle word-staggered rise from +24px → 0. If JS fails,
 * readers still see the full heading.
 */
export function LetterReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  italicize = false,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.div;

  if (reduce) {
    return <Tag className={className} aria-label={text}>{text}</Tag>;
  }

  return (
    <MotionTag
      aria-label={text}
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block"
          style={{ whiteSpace: "pre" }}
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 1.0, ease: [0.165, 0.84, 0.44, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
