import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ElementType, FC, ReactNode } from "react";

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
}

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-xl font-extrabold",
      h2: "text-xl font-bold",
      h3: "text-lg font-bold",
      h4: "text-lg font-semibold",
      h5: "text-base font-semibold",
      h6: "text-sm font-semibold",
      body: "text-sm font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const Typography: FC<TypographyProps> = ({
  variant = "body",
  className,
  as,
  ...props
}) => {
  const Component = (as ?? (variant === "body" ? "p" : variant)) || "p";

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
};

export default Typography;
