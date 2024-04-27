import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
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
      themes: {
        light: {
          colors: {
            foreground: colors.slate,
            secondary: {
              DEFAULT: colors.indigo[500],
            },
          },
        },
        dark: {
          colors: {
            foreground: colors.slate,
            secondary: {
              DEFAULT: colors.indigo[500],
            },
            default: {
              100: colors.slate[900],
              200: colors.slate[800],
              300: colors.slate[700],
              400: colors.slate[600],
              500: colors.slate[500],
              DEFAULT: colors.slate[800],
              600: colors.slate[400],
              700: colors.slate[300],
              800: colors.slate[200],
              900: colors.slate[100],
            },
            content1: colors.slate[950],
          },
        },
      },
    }),
    typographyPlugin(),
  ],
};
export default config;
