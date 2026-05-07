import { Inter, IBM_Plex_Mono, Noto_Serif_Display } from "next/font/google";

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

// Theatrical title face — used ONLY on the homepage hero.
const displaySerifFont = Noto_Serif_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-serif-display",
  weight: ["200", "300"],
  style: ["normal", "italic"],
});

export const inter = interFont;
export const mono = monoFont;
export const serifDisplay = displaySerifFont;

// Legacy aliases — components still import these names.
// All collapse to Inter; italic at the CSS layer is now allowed (selectively).
export const bodoni = interFont;
export const sourceSerif = interFont;
export const cartel = interFont;
