import { cn } from "@/lib/utils";
import { Asterism } from "./Fregio";

type Props = {
  words: string[];
  className?: string;
  /**
   * "ink" for light sections, "cream" for dark sections.
   */
  tone?: "ink" | "cream";
};

/**
 * Italian-keyword marquee. "teatro · lingua · comunità · patrimonio · memoria · passione"
 * Infinite horizontal scroll — the running frieze of a teatro foyer.
 */
export function Marquee({ words, className, tone = "ink" }: Props) {
  const doubled = [...words, ...words]; // duplicate for seamless loop

  return (
    <div
      className={cn(
        "marquee border-y py-5",
        tone === "ink"
          ? "border-[color:var(--color-sepia)]/20 text-[color:var(--color-sepia)]"
          : "border-[color:var(--color-travertino)]/30 text-[color:var(--color-travertino)]",
        className,
      )}
      aria-hidden
    >
      <div className="marquee-track">
        {doubled.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-flex items-center gap-[3.5rem]"
          >
            <span className="bodoni-italic text-[clamp(2.25rem,5vw,4rem)] leading-none">
              {w}
            </span>
            <Asterism tone={tone === "cream" ? "cream" : "terracotta"} />
          </span>
        ))}
      </div>
    </div>
  );
}
