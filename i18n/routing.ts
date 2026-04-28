import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Routing config.
 *
 * We use a single URL scheme for both locales (Italian slugs for the Italian-heritage
 * charity), with the visible link labels translated via the `nav.*` messages.
 * That keeps URLs short, file-system-matched, SEO-friendly and removes a whole class
 * of middleware-rewrite bugs.
 */
export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export function hasLocale(value: unknown): value is Locale {
  return typeof value === "string" && (routing.locales as readonly string[]).includes(value);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
