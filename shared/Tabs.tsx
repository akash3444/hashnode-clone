import { cn } from "@/lib/utils";
import {
  Tab as NextUiTab,
  Tabs as NextUiTabs,
  TabsProps,
} from "@nextui-org/react";
import { FC } from "react";

export const Tabs: FC<TabsProps> = ({
  classNames,
  variant = "solid",
  ...props
}) => {
  return (
    <NextUiTabs
      variant={variant}
      {...props}
      color="primary"
      classNames={{
        ...classNames,
        base: cn(
          "max-w-full overflow-x-auto",
          { "border-b": variant === "underlined" },
          classNames?.base
        ),
        tabList: cn(
          { "bg-transparent p-0": variant === "solid" },
          { "p-0": variant === "underlined" },
          classNames?.tabList
        ),
        tab: cn({ "h-10": variant === "underlined" }, classNames?.tab),
        cursor: cn(
          { "rounded-full bg-opacity-10": variant === "solid" },
          { "w-full": variant === "underlined" },
          classNames?.cursor
        ),
        tabContent: cn(
          { "group-data-[selected=true]:text-primary": variant === "solid" },
          { "font-medium": variant === "underlined" },
          classNames?.tabContent
        ),
      }}
    />
  );
};

export { NextUiTab as Tab };
