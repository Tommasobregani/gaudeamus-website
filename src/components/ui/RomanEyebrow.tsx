import { cn } from "@/lib/utils";

type Props = {
  n?: number;
  label: string;
  className?: string;
  align?: "start" | "center";
};

/**
 * Section eyebrow — numeric index + label, separated by a short rule.
 * "01 · Manifesto" / "02 · Progetti". Replaced Roman numerals with Arabic
 * (padded 01/02/03) for clarity.
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
        <span className="font-[family-name:var(--font-mono)] text-[0.78rem] font-medium tracking-[0.2em] text-[color:var(--color-terracotta)]">
          {String(n).padStart(2, "0")}
        </span>
      )}
      <span className="h-px w-6 bg-current opacity-40" aria-hidden />
      <span className="cartel text-[color:var(--color-sepia)]">{label}</span>
    </div>
  );
}
