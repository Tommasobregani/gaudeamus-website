"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

type Props = {
  options: FilterOption[];
  onChange?: (value: string) => void;
  initial?: string;
  className?: string;
};

/**
 * FilterTabs — Italian playbill-style filter pills.
 * Bebas cartel caps, terracotta underline on active, big number count in Bodoni.
 */
export function FilterTabs({ options, onChange, initial, className }: Props) {
  const [active, setActive] = useState(initial ?? options[0]?.value);

  function select(v: string) {
    setActive(v);
    onChange?.(v);
  }

  return (
    <div
      role="tablist"
      aria-label="Filter"
      className={cn("flex flex-wrap items-end gap-x-8 gap-y-3", className)}
    >
      {options.map((o) => {
        const isActive = o.value === active;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => select(o.value)}
            className={cn(
              "group relative pb-2 text-left transition-colors",
              isActive
                ? "text-[color:var(--color-sepia)]"
                : "text-[color:var(--color-sepia)]/50 hover:text-[color:var(--color-sepia)]",
            )}
          >
            <span className="flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-cartel)] text-[0.85rem] tracking-[0.26em] uppercase">
                {o.label}
              </span>
              {typeof o.count === "number" && (
                <span className="bodoni-italic text-[0.95rem] leading-none text-[color:var(--color-terracotta)]">
                  {o.count}
                </span>
              )}
            </span>
            <span
              aria-hidden
              className={cn(
                "absolute -bottom-[1px] left-0 right-0 h-[2px] origin-left bg-[color:var(--color-terracotta)] transition-transform",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
