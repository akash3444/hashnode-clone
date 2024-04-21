import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import typographyPlugin from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        borderWidth: {
          small: "1px",
          medium: "1px",
        },
      },
    }),
    typographyPlugin(),
  ],
};
export default config;
