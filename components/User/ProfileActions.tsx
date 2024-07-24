"use client";

import { User } from "@/lib/types";
import { cn, getLinkedInShareUrl, getTwitterShareUrl } from "@/lib/utils";
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
import { UserFollowButton } from "./UserFollowButton";

export const ProfileActions = ({
  user,
  className,
  isOwnProfile,
}: {
  user: User;
  className?: string;
  isOwnProfile?: boolean;
}) => {
  const shareProfile = (platform: string) => {
    const text = `Check ${user.name}'s profile on @hashnode ${window.location.href}`;

    switch (platform) {
      case "twitter":
        window.open(getTwitterShareUrl(text), "_blank");
        break;
      case "linkedIn":
        window.open(getLinkedInShareUrl(window.location.href), "_blank");
        break;
    }
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Dropdown placement="bottom" disableAnimation>
        <DropdownTrigger>
          <Button isIconOnly variant="bordered">
            <ShareIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Share profile"
          variant="flat"
          onAction={(key) => shareProfile(key as string)}
        >
          <DropdownItem
            key="twitter"
            startContent={<XIcon className="h-6 w-6" />}
          >
            <p className="font-semibold">Twitter</p>
          </DropdownItem>
          <DropdownItem
            key="linkedIn"
            startContent={<LinkedInIcon className="h-6 w-6" />}
          >
            <p className="font-semibold">LinkedIn</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {!isOwnProfile && (
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
      )}

      {!isOwnProfile && <UserFollowButton following={user.following} />}
    </div>
  );
};
