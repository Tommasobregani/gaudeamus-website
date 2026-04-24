import { cn } from "@/lib/utils";

type Props = {
  quote: string;
  attribution?: string;
  className?: string;
};

/**
 * PullQuote — massive opening « in Bodoni italic terracotta,
 * the quoted text set in Bodoni italic at pull-quote scale.
 * The Italian editorial voice: Rivista Studio, Domus, Vogue Italia use this.
 */
export function PullQuote({ quote, attribution, className }: Props) {
  return (
    <aside className={cn("relative my-16 md:my-24", className)}>
      <span
        aria-hidden
        className="bodoni-italic absolute -left-2 -top-8 text-[clamp(6rem,12vw,10rem)] leading-[0.6] text-[color:var(--color-terracotta)]"
      >
        «
      </span>
      <blockquote className="relative pl-10 md:pl-16">
        <p className="bodoni-italic max-w-[28ch] text-[clamp(1.85rem,3vw+1rem,3rem)] leading-[1.15] text-[color:var(--color-sepia)]">
          {quote}
        </p>
        {attribution && (
          <footer className="mt-6 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-sepia-soft)]">
            — {attribution}
          </footer>
        )}
      </blockquote>
    </aside>
  );
}
