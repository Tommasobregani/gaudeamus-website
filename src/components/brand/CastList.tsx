import { cn } from "@/lib/utils";

type CastRow = {
  role: string;
  name: string;
};

type Props = {
  title?: string;
  rows: CastRow[];
  className?: string;
};

/**
 * CastList — programme insert. Inter only, hairline rows.
 */
export function CastList({ title, rows, className }: Props) {
  return (
    <div className={cn("", className)}>
      {title && (
        <p className="mb-5 font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-notte)]">
          {title}
        </p>
      )}
      <dl className="divide-y divide-[color:var(--color-sepia)]/12 border-y border-[color:var(--color-sepia)]/20">
        {rows.map((r) => (
          <div
            key={`${r.role}-${r.name}`}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3.5"
          >
            <dt className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
              {r.role}
            </dt>
            <span
              aria-hidden
              className="relative top-[-3px] border-b border-dotted border-[color:var(--color-sepia)]/22"
            />
            <dd className="font-[family-name:var(--font-inter)] text-[1rem] font-medium leading-none tracking-[-0.012em] text-[color:var(--color-sepia)]">
              {r.name}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
