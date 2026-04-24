import { cn } from "@/lib/utils";

type Props = {
  issueLabel: string;      // "ANNO I · NUMERO III"
  dateLabel: string;       // "APRILE · MMXXVI"
  title: string;           // "Il Diario"
  subtitle?: string;       // "Notes from the wings."
  className?: string;
};

/**
 * MagazineMasthead — the front-page header of a printed Italian periodical.
 * Horizontal rule, issue + date flanking a big Bodoni title.
 */
export function MagazineMasthead({ issueLabel, dateLabel, title, subtitle, className }: Props) {
  return (
    <header className={cn("border-y-2 border-[color:var(--color-sepia)]", className)}>
      <div className="flex items-center justify-between border-b border-[color:var(--color-sepia)]/25 px-1 py-3">
        <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
          {issueLabel}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
          {dateLabel}
        </span>
      </div>
      <div className="px-1 py-6 text-center">
        <h1 className="bodoni-italic text-[clamp(3.5rem,10vw+1rem,10rem)] leading-[0.88] text-[color:var(--color-sepia)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-[family-name:var(--font-body)] italic text-[1.05rem] text-[color:var(--color-sepia-soft)]">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
