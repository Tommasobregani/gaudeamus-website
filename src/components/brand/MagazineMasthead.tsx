import { cn } from "@/lib/utils";

type Props = {
  issueLabel: string;
  dateLabel: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * MagazineMasthead — section header for the news/journal page.
 * Inter only. Hairline rules, weight contrast, no italic.
 */
export function MagazineMasthead({
  issueLabel,
  dateLabel,
  title,
  subtitle,
  className,
}: Props) {
  return (
    <header className={cn("border-y border-[color:var(--color-sepia)]/15", className)}>
      <div className="flex items-center justify-between border-b border-[color:var(--color-sepia)]/10 px-1 py-3">
        <span className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[color:var(--color-sepia)]">
          {issueLabel}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
          {dateLabel}
        </span>
      </div>
      <div className="px-1 py-10 text-center md:py-14">
        <h1 className="font-[family-name:var(--font-inter)] text-[clamp(2.6rem,6vw+0.5rem,5.5rem)] font-light leading-[1.02] tracking-[-0.025em] text-[color:var(--color-sepia)]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-[52ch] font-[family-name:var(--font-inter)] text-[1rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
