import React, { FC } from "react";
import { Tooltip as NextUiTooltip, TooltipProps } from "@nextui-org/tooltip";

const Tooltip: FC<TooltipProps> = (props) => {
  return (
    <NextUiTooltip
      delay={0}
      closeDelay={0}
      color="foreground"
      disableAnimation
      showArrow
      {...props}
    />
  );
};

export default Tooltip;
