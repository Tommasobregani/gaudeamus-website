import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  ariaHidden?: boolean;
  tone?: "ink" | "cream";
};

/**
 * Typographic wordmark in the Italian playbill tradition.
 *
 *   Gaudeamus             ← Bodoni italic, the name
 *   ——————————            ← hairline
 *   COMPAGNIA ARTISTICA   ← Bebas cartel, the legal lineage
 *   SCIO · 2023
 *
 * One-file swap when the official logo arrives.
 */
export function Wordmark({
  className,
  variant = "full",
  ariaHidden = false,
  tone = "ink",
}: Props) {
  const ink = tone === "cream" ? "text-[color:var(--color-travertino)]" : "text-[color:var(--color-sepia)]";
  const muted = tone === "cream" ? "text-[color:var(--color-travertino)]/65" : "text-[color:var(--color-muted)]";

  if (variant === "mark") {
    return (
      <span
        aria-hidden={ariaHidden || undefined}
        className={cn(
          "bodoni-italic text-2xl leading-none",
          ink,
          className,
        )}
      >
        G.
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span
        aria-label={ariaHidden ? undefined : "Gaudeamus — Compagnia Artistica SCIO"}
        className={cn("inline-flex flex-col items-start leading-none", className)}
      >
        <span className={cn("bodoni-italic text-[1.9rem] leading-[0.85] tracking-[-0.035em]", ink)}>
          Gaudeamus
        </span>
        <span className={cn("mt-2 h-px w-full opacity-40", tone === "cream" ? "bg-[color:var(--color-travertino)]" : "bg-[color:var(--color-sepia)]")} aria-hidden />
        <span
          className={cn(
            "mt-2 font-[family-name:var(--font-cartel)] text-[0.68rem] leading-none tracking-[0.26em]",
            muted,
          )}
        >
          SCIO · 2023
        </span>
      </span>
    );
  }

  // full (horizontal)
  return (
    <span
      aria-label={ariaHidden ? undefined : "Gaudeamus"}
      className={cn("inline-flex items-baseline gap-2 leading-none", className)}
    >
      <span className={cn("bodoni-italic text-[1.65rem] leading-none tracking-[-0.035em]", ink)}>
        Gaudeamus
      </span>
      <span
        aria-hidden
        className={cn(
          "font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em]",
          muted,
        )}
      >
        SCIO
      </span>
    </span>
  );
}
