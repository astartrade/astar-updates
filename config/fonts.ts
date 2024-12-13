// fonts.ts

import { Bebas_Neue, Poppins } from "next/font/google";

type Props = {
  subset: string | string[];
  weight: string | string[];
  style: string | string[];
  display: string | string[];
};

export const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-bebas", // Define the CSS variable here
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-sans", // Define the CSS variable here
});
