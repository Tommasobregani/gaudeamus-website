import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Common = {
  variant?: "primary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Button visual language: rounded-pill, subtle glass for primary, hairline glass border for outline.
 * Matches Eva's "semplice e lineare" by avoiding gradients/shadows-as-decoration, while picking up the
 * rounded sophistication the user asked for.
 */

const styles = {
  primary:
    "glass-accent text-[color:var(--color-on-accent)] hover:-translate-y-0.5 hover:brightness-110",
  outline:
    "border border-[color:var(--color-sepia)]/22 bg-[color:var(--color-travertino)]/40 text-[color:var(--color-sepia)] backdrop-blur-md hover:bg-[color:var(--color-sepia)] hover:text-[color:var(--color-travertino)] hover:border-[color:var(--color-sepia)]",
  ghost:
    "bg-transparent text-[color:var(--color-sepia)] hover:bg-[color:var(--color-sepia)]/8",
  glass:
    "glass-light text-[color:var(--color-sepia)] hover:bg-[color:var(--color-sepia)]/10",
} as const;

const sizes = {
  sm: "h-10 px-5 text-[0.74rem]",
  md: "h-12 px-7 text-[0.8rem]",
  lg: "h-14 px-9 text-[0.84rem]",
} as const;

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-[family-name:var(--font-cartel)] uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-pompeiano)] disabled:opacity-50 disabled:pointer-events-none";

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
      {withArrow && <ArrowRight size={14} strokeWidth={1.7} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
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
      {withArrow && <ArrowRight size={14} strokeWidth={1.7} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </button>
  );
}
