import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.italiandramauk.org",
  name: "Gaudeamus",
  legalName: "Compagnia Artistica Gaudeamus SCIO",
  tagline: {
    en: "Italian arts and heritage, rooted in Scotland.",
    it: "Arte e cultura italiana, radicata in Scozia.",
  },
  description: {
    en: "Gaudeamus is an Italo-Scottish charity promoting Italian culture and heritage in Scotland through theatre, cultural events, education, and community initiatives.",
    it: "Gaudeamus è una charity italo-scozzese dedicata alla promozione della cultura e del patrimonio italiano in Scozia attraverso teatro, eventi culturali, attività educative e iniziative comunitarie.",
  },
  locations: [
    { city: "Aberdeen", role: "HQ", country: "Scotland" },
    { city: "Glasgow", role: "Branch", country: "Scotland" },
  ],
  email: {
    general: "info@italiandramauk.org",
    artistic: "gaudeamus@italiandramauk.org",
    finance: "finance@italiandramauk.org",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export type Locale = "en" | "it";
