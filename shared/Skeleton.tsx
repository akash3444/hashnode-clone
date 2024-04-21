import React, { FC } from "react";
import { Skeleton as NextUiSkeleton, SkeletonProps } from "@nextui-org/react";

const Skeleton: FC<SkeletonProps> = (props) => {
  return (
    <NextUiSkeleton
      {...props}
      classNames={{
        base: "bg-foreground-100 before:via-foreground-200/80",
      }}
    />
  );
};

export default Skeleton;
