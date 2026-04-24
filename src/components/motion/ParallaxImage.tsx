"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "placeholder"> & {
  wrapperClassName?: string;
  intensity?: number; // 0..1
};

export function ParallaxImage({
  wrapperClassName,
  intensity = 0.1,
  className,
  alt,
  ...imgProps
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-intensity * 100}%`, `${intensity * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", wrapperClassName)}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image
          alt={alt}
          className={cn("object-cover", className)}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          {...imgProps}
        />
      </motion.div>
    </div>
  );
}
