import React, { FC } from "react";
import {
  Card as NextUiCard,
  CardProps,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/card";
import { cn } from "@/lib/utils";

const Card: FC<CardProps> = ({ className, ...props }) => {
  return (
    <NextUiCard
      className={cn(
        "p-3 border dark:border-foreground-800 dark:bg-transparent",
        className
      )}
      shadow="none"
      {...props}
    />
  );
};

export { CardHeader, CardBody, CardFooter };

export default Card;
