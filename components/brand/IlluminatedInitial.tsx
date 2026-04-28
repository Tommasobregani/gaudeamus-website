import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  initial?: string; // defaults to first letter of children (if string)
  className?: string;
};

/**
 * IlluminatedInitial — Renaissance manuscript drop-cap.
 * The first letter is set in big Bodoni italic on a terracotta block,
 * with the rest of the paragraph wrapping around it.
 */
export function IlluminatedInitial({ children, initial, className }: Props) {
  const text =
    typeof children === "string" ? children : String(children);
  const letter = initial ?? text.charAt(0).toUpperCase();
  const rest = typeof children === "string" ? text.slice(1) : children;

  return (
    <p
      className={cn(
        "font-[family-name:var(--font-body)] text-[1.35rem] leading-[1.55] text-[color:var(--color-sepia)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="float-left mr-4 mt-2 inline-flex h-[5.5rem] w-[5.5rem] items-center justify-center bg-[color:var(--color-terracotta)] bodoni-italic text-[5rem] leading-none text-[color:var(--color-travertino)]"
      >
        {letter}
      </span>
      {rest}
    </p>
  );
}
