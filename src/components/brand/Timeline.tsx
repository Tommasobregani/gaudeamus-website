"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
};

type Props = {
  entries: TimelineEntry[];
  className?: string;
};

/**
 * Timeline — annals-style. Year (Roman numeral) right-aligned against a vertical
 * rule, title + body on the right. Each entry fades + rises on enter.
 *
 * Year column is sized generously (10rem desktop) to fit even "MMXXIV" without
 * overflowing into the rule.
 */
export function Timeline({ entries, className }: Props) {
  return (
    <ol className={cn("relative", className)}>
      <span
        aria-hidden
        className="absolute left-[calc(5rem)] top-0 bottom-0 w-px bg-[color:var(--color-sepia)]/30 md:left-[calc(10rem)]"
      />
      {entries.map((e, i) => (
        <Entry key={`${e.year}-${i}`} entry={e} index={i} />
      ))}
    </ol>
  );
}

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduce) {
      setEntered(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > 0) {
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
    const t = setTimeout(() => setEntered(true), 1000);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, [reduce]);

  return (
    <motion.li
      ref={ref}
      initial={{ y: 14 }}
      animate={{ y: entered ? 0 : 14 }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.2, 0.7, 0.1, 1] }}
      className="relative grid grid-cols-[5rem_1fr] items-baseline gap-6 py-8 md:grid-cols-[10rem_1fr] md:gap-12"
    >
      <span
        className="bodoni-italic block text-right pr-5 text-[clamp(1.35rem,2vw+0.5rem,2rem)] leading-[0.95] text-[color:var(--color-terracotta)] md:pr-8"
      >
        {entry.year}
      </span>
      <div>
        <h3 className="bodoni-italic text-[clamp(1.5rem,2vw+1rem,2rem)] leading-[1.1] text-[color:var(--color-sepia)]">
          {entry.title}
        </h3>
        <p className="mt-3 max-w-[60ch] font-[family-name:var(--font-body)] text-[1rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
          {entry.body}
        </p>
      </div>
      <span
        aria-hidden
        className="absolute left-[calc(5rem-4px)] top-[calc(1.5rem+0.25rem)] h-2 w-2 rounded-full bg-[color:var(--color-terracotta)] md:left-[calc(10rem-4px)]"
      />
    </motion.li>
  );
}
