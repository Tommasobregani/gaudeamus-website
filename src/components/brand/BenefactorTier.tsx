import { cn } from "@/lib/utils";

type Props = {
  roman: string;
  label: string;             // "AMICO"
  subtitle: string;          // "Amici di Gaudeamus"
  amount?: string;           // "da £20"
  perks: string[];
  className?: string;
  featured?: boolean;
};

/**
 * BenefactorTier — Italian patronage tradition: Amici / Sostenitori / Mecenati.
 * A stamped certificate-style card in travertine + sepia, Bodoni italic name,
 * Bebas cartel tier label and a list of what the patron receives.
 */
export function BenefactorTier({
  roman,
  label,
  subtitle,
  amount,
  perks,
  className,
  featured = false,
}: Props) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col border-2 p-6 md:p-8",
        featured
          ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)]/5"
          : "border-[color:var(--color-sepia)] bg-[color:var(--color-carta)]",
        className,
      )}
    >
      {/* corner ornaments */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[color:var(--color-terracotta)]"
      />
      <span
        aria-hidden
        className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[color:var(--color-terracotta)]"
      />
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-[color:var(--color-terracotta)]"
      />
      <span
        aria-hidden
        className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[color:var(--color-terracotta)]"
      />

      <div className="flex items-baseline gap-4">
        <span className="bodoni-italic text-[2.5rem] leading-none text-[color:var(--color-terracotta)]">
          {roman}
        </span>
        <span className="font-[family-name:var(--font-cartel)] text-[0.85rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
          {label}
        </span>
      </div>

      <h3 className="mt-5 bodoni-italic text-[2rem] leading-[1.05] text-[color:var(--color-sepia)]">
        {subtitle}
      </h3>

      {amount && (
        <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.85rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {amount}
        </p>
      )}

      <ul className="mt-8 space-y-3">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[color:var(--color-sepia-soft)]">
            <span
              aria-hidden
              className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 bg-[color:var(--color-terracotta)]"
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
