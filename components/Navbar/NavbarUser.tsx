"use client";

import { logout } from "@/api/auth";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import Typography from "@/shared/Typography";
import { SessionUser } from "@/types/auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {
  BookmarksIcon,
  ChevronRight,
  ExitIcon,
  FilterIcon,
  GiftIcon,
  HelpCircleIcon,
  NoteIcon,
  TimeIcon,
  UserCircleIcon,
} from "../icons";

export const NavbarUser = ({ user }: { user: SessionUser }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="relative h-10 w-10 rounded-full">
          <Image
            src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt=""
            fill
            className="rounded-full"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection
          showDivider
          classNames={{ group: "space-y-1", divider: "!mt-3" }}
        >
          <DropdownItem as={Link} href={`/users/${user.username}`}>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full">
                <Image
                  src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
                  alt=""
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <Typography variant="h5">{user.name}</Typography>
                <Typography>@{user.username}</Typography>
              </div>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Personal Blog" showDivider>
          <DropdownItem endContent={<ChevronRight className="h-4 w-4" />}>
            akash3444.hashnode.dev
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem startContent={<NoteIcon />}>My Drafts</DropdownItem>
          <DropdownItem startContent={<BookmarksIcon />}>
            Bookmarks
          </DropdownItem>
          <DropdownItem startContent={<UserCircleIcon />}>
            Account settings
          </DropdownItem>
          <DropdownItem startContent={<FilterIcon />}>
            Manage your blogs
          </DropdownItem>
          <DropdownItem startContent={<TimeIcon />}>
            My reading history
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem
            className="text-success-600"
            startContent={<GiftIcon />}
          >
            Earn $500
          </DropdownItem>
          <DropdownItem startContent={<HelpCircleIcon />}>
            Support and feedback
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            className="text-danger-500"
            startContent={<ExitIcon />}
            onPress={() => logout()}
          >
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
