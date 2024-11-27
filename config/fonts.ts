// fonts.ts

import {
  Bebas_Neue,
  Source_Sans_3,
  Playfair_Display,
  Poppins,
  Lato,
  Inter,
  Montserrat,
} from "next/font/google";

type Props = {
  subset: string | string[];
  weight: string | string[];
  style: string | string[];
  display: string | string[];
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-bebas", // Define the CSS variable here
});

const playfair = Playfair_Display({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
  adjustFontFallback: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-sans", // Define the CSS variable here
});

const sourceCodePro700 = Source_Sans_3({ subsets: ["latin"], weight: "700" });

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});

export {
  poppins,
  playfair_display,
  bebas,
  sourceCodePro700,
  lato,
  inter,
  montserrat,
};
