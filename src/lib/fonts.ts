import { Bodoni_Moda, Source_Serif_4, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";

// Display — invented in Parma by Giambattista Bodoni. The most Italian serif.
export const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Body — warm editorial serif. Pairs with Bodoni without competing.
export const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Cartel — condensed caps for section labels. The manifesto-poster voice.
export const cartel = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-cartel",
  weight: ["400"],
});

// Data — uppercase mono for dates, codes, stats.
export const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});
