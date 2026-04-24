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
 * CastList — the program-insert of an Italian teatro playbill.
 * Role on the left in Bebas cartel, name on the right in Bodoni italic,
 * dots as leaders in between (like an operatic libretto).
 */
export function CastList({ title, rows, className }: Props) {
  return (
    <div className={cn("", className)}>
      {title && (
        <p className="mb-5 font-[family-name:var(--font-cartel)] text-[0.82rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
          {title}
        </p>
      )}
      <dl className="divide-y divide-[color:var(--color-sepia)]/20 border-y border-[color:var(--color-sepia)]/25">
        {rows.map((r) => (
          <div
            key={`${r.role}-${r.name}`}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3"
          >
            <dt className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.26em] text-[color:var(--color-sepia)]">
              {r.role}
            </dt>
            <span
              aria-hidden
              className="relative top-[-3px] border-b border-dotted border-[color:var(--color-sepia)]/35"
            />
            <dd className="bodoni-italic text-[1.15rem] leading-none text-[color:var(--color-sepia)]">
              {r.name}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
