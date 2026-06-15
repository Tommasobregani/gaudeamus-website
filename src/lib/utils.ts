import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaudeamus-webiste.netlify.app",
  name: "Gaudeamus",
  legalName: "Compagnia Artistica Gaudeamus SCIO",
  charityNumber: "SC052772",
  registeredOffice: { city: "Aberdeen", country: "Scotland" },
  coverage: {
    en: "Operating across Scotland",
    it: "Operiamo in tutta la Scozia",
  },
  tagline: {
    en: "Italian arts and culture, across Scotland.",
    it: "Arte e cultura italiana, in tutta la Scozia.",
  },
  description: {
    en: "Compagnia Artistica Gaudeamus SCIO is a Scottish-registered Italian charity (SC052772) based in Aberdeen. We bring Italian arts to Scotland through theatre, language workshops and community events — and we are the only charity in Scotland staging plays entirely in Italian, with live English subtitles.",
    it: "Compagnia Artistica Gaudeamus SCIO è una charity italiana registrata in Scozia (SC052772) con sede ad Aberdeen. Portiamo l'arte italiana in Scozia attraverso teatro, laboratori di lingua ed eventi di comunità — e siamo l'unica charity in Scozia a portare in scena spettacoli interamente in italiano, con sottotitoli live in inglese.",
  },
  email: {
    general: "info@italiandramauk.org",
    artistic: "gaudeamus@italiandramauk.org",
    finance: "finance@italiandrama.uk",
  },
  bank: {
    name: "Lloyds Bank",
    accountHolder: "Compagnia Artistica Gaudeamus SCIO",
    accountNumber: "20035163",
    sortCode: "30-99-50",
    reference: "Donation — Gaudeamus",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100094224285903",
    instagram: "https://www.instagram.com/compagnia_artistica_gaudeamus/",
  },
} as const;

export type Locale = "en" | "it";
