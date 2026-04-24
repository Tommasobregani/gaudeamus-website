import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Common = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

const styles = {
  primary:
    "bg-[color:var(--color-sepia)] text-[color:var(--color-travertino)] hover:bg-[color:var(--color-terracotta)]",
  outline:
    "bg-transparent text-[color:var(--color-sepia)] border border-[color:var(--color-sepia)] hover:bg-[color:var(--color-sepia)] hover:text-[color:var(--color-travertino)]",
  ghost:
    "bg-transparent text-[color:var(--color-sepia)] hover:bg-[color:var(--color-sepia)]/5",
} as const;

const sizes = {
  sm: "h-10 px-4 text-[0.78rem]",
  md: "h-12 px-7 text-[0.82rem]",
} as const;

// Zero-radius, cartel-capped buttons — the manifesto voice, not the dashboard voice.
const base =
  "inline-flex items-center justify-center gap-3 font-[family-name:var(--font-cartel)] uppercase tracking-[0.22em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4";

type LinkProps = Common & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "children" | "className"
  >;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className,
  ...rest
}: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(base, styles[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight size={14} strokeWidth={1.5} />}
    </Link>
  );
}

type BtnProps = Common & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className,
  ...rest
}: BtnProps) {
  return (
    <button className={cn(base, styles[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow && <ArrowRight size={14} strokeWidth={1.5} />}
    </button>
  );
}
