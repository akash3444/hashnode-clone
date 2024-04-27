import React, { FC } from "react";
import { Skeleton as NextUiSkeleton, SkeletonProps } from "@nextui-org/react";

const Skeleton: FC<SkeletonProps> = (props) => {
  return (
    <NextUiSkeleton
      disableAnimation
      {...props}
      classNames={{
        base: "bg-foreground-100 dark:bg-foreground-900",
      }}
    />
  );
};

export default Skeleton;
