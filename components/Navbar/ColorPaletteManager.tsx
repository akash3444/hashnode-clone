"use client";

import { capitalize, cn } from "@/lib/utils";
import Tooltip from "@/shared/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useTheme } from "next-themes";

const ColorPaletteManager = () => {
  const { themes: defaultThemes, theme: currentTheme, setTheme } = useTheme();

  const isDarkMode = currentTheme?.startsWith("dark-");

  const themes = defaultThemes.filter(
    (theme) => !theme.startsWith("dark") && theme !== "system"
  );

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <div
          className={cn(
            "cursor-pointer h-5 w-5 rounded-full bg-primary ring-2 ring-offset-2 ring-primary dark:ring-offset-foreground-950"
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="p-3 flex-row items-center gap-4">
        {themes.map((theme) => {
          const themePreference = isDarkMode ? `dark-${theme}` : theme;

          return (
            <Tooltip key={theme} content={capitalize(theme)} offset={12}>
              <div
                onClick={() => setTheme(themePreference)}
                data-theme={theme}
                className={cn(
                  "cursor-pointer h-6 w-6 rounded-full bg-primary",
                  {
                    "ring-2 ring-primary ring-offset-2 dark:ring-offset-foreground-950":
                      themePreference === currentTheme,
                  }
                )}
              />
            </Tooltip>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default ColorPaletteManager;
