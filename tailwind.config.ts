import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { nextui } from "@nextui-org/react";
import typographyPlugin from "@tailwindcss/typography";

const lightThemeColors = {
  foreground: colors.slate,
  secondary: {
    DEFAULT: colors.indigo[500],
  },
};
const darkThemeColors = {
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
};

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
  darkMode: ["selector", '[data-theme^="dark-"]'],
  plugins: [
    nextui({
      layout: {
        borderWidth: {
          small: "1px",
          medium: "1px",
        },
      },
      themes: {
        default: {
          colors: lightThemeColors,
        },
        "dark-default": {
          extend: "dark",
          colors: darkThemeColors,
        },
        rose: {
          colors: {
            ...lightThemeColors,
            primary: {
              ...colors.rose,
              DEFAULT: colors.rose[500],
            },
          },
        },
        "dark-rose": {
          extend: "dark",
          colors: {
            ...darkThemeColors,
            primary: {
              ...colors.rose,
              DEFAULT: colors.rose[500],
            },
          },
        },
        orange: {
          colors: {
            ...lightThemeColors,
            primary: {
              ...colors.orange,
              DEFAULT: colors.orange[500],
            },
          },
        },
        "dark-orange": {
          extend: "dark",
          colors: {
            ...darkThemeColors,
            primary: {
              ...colors.orange,
              DEFAULT: colors.orange[500],
            },
          },
        },
        purple: {
          colors: {
            ...lightThemeColors,
            primary: {
              ...colors.purple,
              DEFAULT: colors.purple[500],
            },
          },
        },
        "dark-purple": {
          extend: "dark",
          colors: {
            ...darkThemeColors,
            primary: {
              ...colors.purple,
              DEFAULT: colors.purple[500],
            },
          },
        },
      },
    }),
    typographyPlugin(),
  ],
};
export default config;
