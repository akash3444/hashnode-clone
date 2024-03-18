import { SEPARATOR_DOT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React, { ComponentProps, FC } from "react";

interface WithSeparatorDotProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

const WithSeparatorDot: FC<WithSeparatorDotProps> = ({
  children,
  className,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index !== childrenArray.length - 1 && (
            <span className="text-foreground-400">{SEPARATOR_DOT}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WithSeparatorDot;
