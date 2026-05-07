import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  ariaHidden?: boolean;
  tone?: "ink" | "cream";
};

/**
 * Wordmark — Inter, weight contrast, no italic.
 *
 *   Gaudeamus  scio   ← name in medium, legal in mono caps
 *   (stacked variant adds a hairline + SCIO · 2023)
 */
export function Wordmark({
  className,
  variant = "full",
  ariaHidden = false,
  tone = "ink",
}: Props) {
  const ink =
    tone === "cream" ? "text-white" : "text-[color:var(--color-sepia)]";
  const muted =
    tone === "cream" ? "text-white/55" : "text-[color:var(--color-muted)]";
  const rule =
    tone === "cream" ? "bg-white/40" : "bg-[color:var(--color-sepia)]/30";

  if (variant === "mark") {
    return (
      <span
        aria-hidden={ariaHidden || undefined}
        className={cn(
          "font-[family-name:var(--font-inter)] text-2xl font-medium leading-none tracking-[-0.025em]",
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
        aria-label={
          ariaHidden ? undefined : "Gaudeamus, Compagnia Artistica SCIO"
        }
        className={cn(
          "inline-flex flex-col items-start leading-none",
          className,
        )}
      >
        <span
          className={cn(
            "font-[family-name:var(--font-inter)] text-[1.85rem] font-medium leading-[0.92] tracking-[-0.03em]",
            ink,
          )}
        >
          Gaudeamus
        </span>
        <span
          aria-hidden
          className={cn("mt-2.5 h-px w-10", rule)}
        />
        <span
          className={cn(
            "mt-2.5 font-[family-name:var(--font-mono)] text-[0.66rem] leading-none uppercase tracking-[0.26em]",
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
      className={cn("inline-flex items-baseline gap-2.5 leading-none", className)}
    >
      <span
        className={cn(
          "font-[family-name:var(--font-inter)] text-[1.4rem] font-medium leading-none tracking-[-0.03em]",
          ink,
        )}
      >
        Gaudeamus
      </span>
      <span
        aria-hidden
        className={cn(
          "font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.26em]",
          muted,
        )}
      >
        SCIO
      </span>
    </span>
  );
}
