"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "placeholder"> & {
  wrapperClassName?: string;
  /**
   * Duotone treatment — applies the terracotta × travertino fresco overlay.
   */
  duotone?: boolean;
};

/**
 * Theatre-curtain reveal. As the image enters view, two panels part from the centre.
 * After it reaches 30% through viewport, the image is fully revealed and parallaxes subtly.
 */
export function CurtainReveal({
  wrapperClassName,
  className,
  alt,
  duotone = false,
  ...imgProps
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const curtainLeft = useTransform(scrollYProgress, [0, 0.35], ["0%", "-50%"]);
  const curtainRight = useTransform(scrollYProgress, [0, 0.35], ["0%", "50%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-[color:var(--color-sepia)]",
        duotone && "duotone",
        wrapperClassName,
      )}
    >
      {/* image layer */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          alt={alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={cn("object-cover", className)}
          {...imgProps}
        />
      </motion.div>

      {/* two velvet-terracotta panels that part */}
      <motion.div
        aria-hidden
        style={{ x: curtainLeft }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[color:var(--color-terracotta-deep)]"
      />
      <motion.div
        aria-hidden
        style={{ x: curtainRight }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[color:var(--color-terracotta-deep)]"
      />
      {/* central hairline so the curtain reads as two panels */}
      <motion.div
        aria-hidden
        style={{ opacity: useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 0.6, 0]) }}
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[color:var(--color-oro)]"
      />
    </div>
  );
}
