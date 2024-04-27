"use client";

import Button from "@/shared/Button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../icons";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "light" ? MoonIcon : SunIcon;

  return (
    <Button
      isIconOnly
      color="default"
      variant="light"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
};
