"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * FadeIn — SSR-safe rise animation.
 *
 * Content is ALWAYS visible (opacity never drops to 0). Only the y-offset
 * animates: elements rise 14px into place when they enter the viewport.
 * If JS fails, content is still fully legible. If IntersectionObserver misses,
 * a 1-second timer forces the animation. Respects prefers-reduced-motion.
 */
export function FadeIn({
  delay = 0,
  y = 14,
  duration = 0.7,
  children,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduce) {
      setEntered(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.15 && rect.bottom > 0) {
      setEntered(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
    );
    obs.observe(node);
    const t = setTimeout(() => setEntered(true), 900);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ y }}
      animate={{ y: entered ? 0 : y }}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.1, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
