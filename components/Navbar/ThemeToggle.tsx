"use client";

import Button from "@/shared/Button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme?.startsWith("dark-");
  const Icon = isDarkTheme ? SunIcon : MoonIcon;

  return (
    <Button
      isIconOnly
      color="default"
      variant="light"
      onClick={() =>
        setTheme(
          isDarkTheme ? theme?.slice(5) || "light-default" : `dark-${theme}`
        )
      }
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
};
