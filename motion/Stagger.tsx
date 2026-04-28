"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

const parent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const child = {
  hidden: { y: 14 },
  show: {
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] },
  },
};

/**
 * Stagger — SSR-safe. Content is always visible, only Y-position animates.
 */
export function Stagger({ children, ...rest }: HTMLMotionProps<"div">) {
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
      variants={parent}
      initial="hidden"
      animate={entered ? "show" : "hidden"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={child} {...rest}>
      {children}
    </motion.div>
  );
}
