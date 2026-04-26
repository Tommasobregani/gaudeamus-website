"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

/**
 * EditorialGallery — varied-size grid inspired by Domus / Vogue Italia spreads.
 *
 * The first image is hero (spans 7/12 cols), followed by a rotating rhythm of
 * landscape / portrait / square cards. Every Nth image takes a full-bleed
 * "centerfold" row. Feels printed, not templated.
 *
 * Behaviour: click any image → full-screen lightbox with arrow nav + Escape.
 */
export function EditorialGallery({ images, alt, className }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Editorial composition: rhythm of sizes, not uniform
  // Pattern cycles: hero (landscape 7col / portrait 5col), triple (4|4|4), wide (8col), tall (4|8), etc.
  return (
    <>
      <div className={cn("space-y-6 md:space-y-8", className)}>
        {groupByRhythm(images).map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={cn(
              "grid gap-6 md:gap-8",
              row.layout === "hero" && "md:grid-cols-12",
              row.layout === "triple" && "md:grid-cols-12",
              row.layout === "centerfold" && "grid-cols-1",
              row.layout === "tall-pair" && "md:grid-cols-12",
              row.layout === "pair" && "md:grid-cols-12",
            )}
          >
            {row.items.map((item) => (
              <GalleryCell
                key={item.globalIndex}
                image={images[item.globalIndex]}
                alt={`${alt} — ${item.globalIndex + 1}`}
                index={item.globalIndex}
                spanClass={item.span}
                aspectClass={item.aspect}
                onOpen={() => setOpen(item.globalIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--color-sepia)]/92 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-travertino)] text-[color:var(--color-sepia)]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-travertino)]/95 text-[color:var(--color-sepia)] md:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-travertino)]/95 text-[color:var(--color-sepia)] md:right-8"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
              className="relative h-[82vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[open]}
                alt={`${alt} — ${open + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-travertino)]/70">
              {String(open + 1).padStart(2, "0")} · {String(images.length).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryCell({
  image,
  alt,
  index,
  spanClass,
  aspectClass,
  onOpen,
}: {
  image: string;
  alt: string;
  index: number;
  spanClass: string;
  aspectClass: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.2 && rect.bottom > 0) {
      setEntered(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 15% 0px", threshold: 0.01 },
    );
    obs.observe(node);
    const t = setTimeout(() => setEntered(true), 1000);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={alt}
      initial={{ y: 12 }}
      animate={{ y: entered ? 0 : 12 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3), ease: [0.2, 0.7, 0.1, 1] }}
      className={cn(
        "group relative block overflow-hidden bg-[color:var(--color-sepia)]/10 focus-visible:outline-2 focus-visible:outline-offset-4",
        spanClass,
        aspectClass,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.04]"
      />
    </motion.button>
  );
}

/**
 * Group images into editorial rows of varying layouts.
 * The rhythm: hero → triple → tall-pair → centerfold → triple → pair → ...
 * Each "row" uses a different grid template so the page never feels like a uniform grid.
 */
type Row = {
  layout: "hero" | "triple" | "centerfold" | "tall-pair" | "pair";
  items: { globalIndex: number; span: string; aspect: string }[];
};

function groupByRhythm(images: string[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let rhythmStep = 0;

  const rhythms: Row["layout"][] = [
    "hero",
    "triple",
    "tall-pair",
    "centerfold",
    "triple",
    "pair",
    "centerfold",
    "triple",
  ];

  while (i < images.length) {
    const layout = rhythms[rhythmStep % rhythms.length];
    rhythmStep++;

    if (layout === "hero") {
      // Big landscape + portrait companion
      const remaining = images.length - i;
      if (remaining >= 2) {
        rows.push({
          layout: "hero",
          items: [
            { globalIndex: i, span: "md:col-span-7", aspect: "aspect-[4/3]" },
            { globalIndex: i + 1, span: "md:col-span-5", aspect: "aspect-[3/4]" },
          ],
        });
        i += 2;
      } else {
        rows.push({
          layout: "centerfold",
          items: [{ globalIndex: i, span: "col-span-1", aspect: "aspect-[16/9]" }],
        });
        i += 1;
      }
    } else if (layout === "triple") {
      const count = Math.min(3, images.length - i);
      rows.push({
        layout: "triple",
        items: Array.from({ length: count }).map((_, k) => ({
          globalIndex: i + k,
          span: "md:col-span-4",
          aspect: "aspect-[4/5]",
        })),
      });
      i += count;
    } else if (layout === "tall-pair") {
      const remaining = images.length - i;
      if (remaining >= 2) {
        rows.push({
          layout: "tall-pair",
          items: [
            { globalIndex: i, span: "md:col-span-4", aspect: "aspect-[3/4]" },
            { globalIndex: i + 1, span: "md:col-span-8", aspect: "aspect-[5/3]" },
          ],
        });
        i += 2;
      } else {
        rows.push({
          layout: "centerfold",
          items: [{ globalIndex: i, span: "col-span-1", aspect: "aspect-[16/9]" }],
        });
        i += 1;
      }
    } else if (layout === "pair") {
      const remaining = images.length - i;
      if (remaining >= 2) {
        rows.push({
          layout: "pair",
          items: [
            { globalIndex: i, span: "md:col-span-6", aspect: "aspect-[4/5]" },
            { globalIndex: i + 1, span: "md:col-span-6", aspect: "aspect-[4/5]" },
          ],
        });
        i += 2;
      } else {
        rows.push({
          layout: "centerfold",
          items: [{ globalIndex: i, span: "col-span-1", aspect: "aspect-[16/9]" }],
        });
        i += 1;
      }
    } else {
      // centerfold
      rows.push({
        layout: "centerfold",
        items: [{ globalIndex: i, span: "col-span-1", aspect: "aspect-[21/9]" }],
      });
      i += 1;
    }
  }

  return rows;
}
