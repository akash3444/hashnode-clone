"use client";

import Button from "@/shared/Button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ChevronDown,
  ExclamationCircleIcon,
  LinkedInIcon,
  ShareIcon,
  XIcon,
} from "../icons";

export const ProfileActions = () => {
  return (
    <div className="flex items-start gap-3">
      <Dropdown placement="bottom" disableAnimation>
        <DropdownTrigger>
          <Button isIconOnly variant="bordered">
            <ShareIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Share profile" variant="flat">
          <DropdownItem startContent={<XIcon className="h-6 w-6" />}>
            <p className="font-semibold">Twitter</p>
          </DropdownItem>
          <DropdownItem startContent={<LinkedInIcon className="h-6 w-6" />}>
            <p className="font-semibold">LinkedIn</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown placement="bottom" disableAnimation>
        <DropdownTrigger>
          <Button isIconOnly variant="bordered">
            <ChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            startContent={<ExclamationCircleIcon className="h-6 w-6" />}
          >
            <p className="font-semibold">Report this profile</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button color="primary">Follow</Button>
    </div>
  );
};
