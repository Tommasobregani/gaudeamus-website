import { cn } from "@/lib/utils";
import { Fregio } from "./Fregio";

type Props = {
  latin: string;
  translation?: string;
  attribution?: string;
  tone?: "cream" | "ink" | "terracotta";
  className?: string;
  size?: "md" | "lg";
};

/**
 * MottoBanner — a Latin motto set in Bodoni italic, with translation beneath
 * and a small attribution. The organisation's deepest cultural anchor:
 * "Gaudeamus igitur, iuvenes dum sumus" is the Latin scholar song the charity
 * takes its name from. This component puts that lineage on the page.
 */
export function MottoBanner({
  latin,
  translation,
  attribution,
  tone = "ink",
  className,
  size = "lg",
}: Props) {
  const ink =
    tone === "cream"
      ? "text-[color:var(--color-travertino)]"
      : tone === "terracotta"
      ? "text-[color:var(--color-terracotta)]"
      : "text-[color:var(--color-sepia)]";
  const soft =
    tone === "cream"
      ? "text-[color:var(--color-travertino)]/70"
      : "text-[color:var(--color-sepia-soft)]";

  const sizeClass =
    size === "lg"
      ? "text-[clamp(2rem,4vw+1rem,4rem)]"
      : "text-[clamp(1.5rem,2.5vw+1rem,2.5rem)]";

  return (
    <figure className={cn("flex flex-col items-center text-center", className)}>
      <Fregio width={180} tone={tone === "cream" ? "cream" : tone} />
      <blockquote className="mt-10">
        <p
          className={cn(
            "bodoni-italic mx-auto max-w-[28ch] leading-[1.08]",
            sizeClass,
            ink,
          )}
        >
          « {latin} »
        </p>
        {translation && (
          <p
            className={cn(
              "mx-auto mt-6 max-w-[40ch] font-[family-name:var(--font-body)] italic leading-[1.5]",
              soft,
            )}
          >
            {translation}
          </p>
        )}
      </blockquote>
      {attribution && (
        <figcaption
          className={cn(
            "mt-8 font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.28em]",
            soft,
          )}
        >
          — {attribution}
        </figcaption>
      )}
      <div className="mt-10">
        <Fregio width={180} tone={tone === "cream" ? "cream" : tone} />
      </div>
    </figure>
  );
}
