import { cn } from "@/lib/utils";

const ROMAN: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

type Props = {
  n?: number;
  label: string;
  className?: string;
  align?: "start" | "center";
};

/**
 * Teatro-program eyebrow: Roman numeral × Bebas cartel label.
 * "I · MANIFESTO" / "II · PROGETTI" / "III · EVENTI" — the cadence of an Italian playbill.
 */
export function RomanEyebrow({ n, label, className, align = "start" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className,
      )}
    >
      {typeof n === "number" && (
        <span
          aria-hidden
          className="bodoni-italic text-[1.5rem] leading-none text-[color:var(--color-terracotta)]"
        >
          {ROMAN[n] ?? n}
        </span>
      )}
      <span className="h-px w-6 bg-current opacity-40" aria-hidden />
      <span className="cartel text-[color:var(--color-sepia)]">{label}</span>
    </div>
  );
}
