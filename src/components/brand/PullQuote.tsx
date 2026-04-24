import { cn } from "@/lib/utils";

type Props = {
  quote: string;
  attribution?: string;
  className?: string;
};

/**
 * PullQuote — balanced editorial quote.
 *
 * Italic Bodoni quote, left-aligned with a restrained terracotta « mark sitting
 * above the text (not inside it). Attribution beneath, left-aligned so the whole
 * block reads as one composition.
 */
export function PullQuote({ quote, attribution, className }: Props) {
  return (
    <aside className={cn("my-16 md:my-20", className)}>
      <div className="mx-auto max-w-[52ch]">
        <span
          aria-hidden
          className="bodoni-italic block text-[3.5rem] leading-[0.6] text-[color:var(--color-terracotta)] md:text-[4.5rem]"
        >
          «
        </span>
        <blockquote className="mt-4">
          <p className="bodoni-italic text-[clamp(1.5rem,2.25vw+1rem,2.5rem)] leading-[1.22] text-[color:var(--color-sepia)]">
            {quote}
          </p>
          {attribution && (
            <footer className="mt-6 font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
              — {attribution}
            </footer>
          )}
        </blockquote>
      </div>
    </aside>
  );
}
