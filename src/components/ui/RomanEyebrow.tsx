import { cn } from "@/lib/utils";

type Props = {
  n?: number;
  label: string;
  className?: string;
  align?: "start" | "center";
};

/**
 * Section eyebrow: "01 — Label". Inter, all weights neutral, hairline tick.
 */
export function RomanEyebrow({ n, label, className, align = "start" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      {typeof n === "number" && (
        <span className="font-[family-name:var(--font-mono)] text-[0.7rem] font-medium tracking-[0.2em] text-[color:var(--color-notte)]">
          {String(n).padStart(2, "0")}
        </span>
      )}
      <span className="h-px w-6 bg-current opacity-30" aria-hidden />
      <span className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-sepia)]">
        {label}
      </span>
    </div>
  );
}
