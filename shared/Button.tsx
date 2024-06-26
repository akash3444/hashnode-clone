import { cn } from "@/lib/utils";
import { ButtonProps, Button as NextUiButton } from "@nextui-org/button";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <NextUiButton
        {...props}
        className={cn("font-semibold rounded-full", className)}
        ref={ref}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
