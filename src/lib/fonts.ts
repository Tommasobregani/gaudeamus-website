import { Inter, IBM_Plex_Mono } from "next/font/google";

const interFont = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const inter = interFont;
export const mono = monoFont;

// Legacy aliases — components still import these names.
// All four collapse to Inter; italic styles are removed at the CSS layer.
export const bodoni = interFont;
export const sourceSerif = interFont;
export const cartel = interFont;
