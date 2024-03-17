import React, { FC } from "react";
import {
  Select as NextUiSelect,
  SelectProps,
  SelectItem,
} from "@nextui-org/select";
import { cn } from "@/lib/utils";

const Select: FC<SelectProps> = ({ classNames, ...props }) => {
  return (
    <NextUiSelect
      classNames={{
        trigger: cn("rounded-full px-3", classNames?.trigger),
        ...classNames,
      }}
      {...props}
    />
  );
};

export { SelectItem };

export default Select;
