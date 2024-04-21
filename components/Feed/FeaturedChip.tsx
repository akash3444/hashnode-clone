import { cn } from "@/lib/utils";
import { Chip, ChipProps } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { FeaturedIcon } from "../icons";

export const FeaturedChip: FC<ChipProps> = ({ className, ...props }) => {
  return (
    <Link href="/featured">
      <Chip
        color="secondary"
        variant="flat"
        className={cn("px-2", { "h-10 px-5": props.size === "lg" }, className)}
        startContent={
          <FeaturedIcon
            className={cn({ "h-6 w-6 mr-1.5": props.size === "lg" })}
          />
        }
        {...props}
        classNames={{
          content: cn("font-semibold", { "text-sm": props.size === "lg" }),
        }}
      >
        Featured
      </Chip>
    </Link>
  );
};
