"use client";

import useBookmarkPost from "@/api/post/useBookmarkPost";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { FC, useState } from "react";
import { BookmarkIcon, BookmarkSolidIcon } from "../icons";
import { ButtonProps, TooltipProps } from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  bookmarked: boolean;
  postId: string;
  tooltipProps?: TooltipProps;
  buttonProps?: Omit<ButtonProps, "ref">;
  iconClassName?: string;
}

export const BookmarkButton: FC<BookmarkButtonProps> = ({
  bookmarked,
  postId,
  tooltipProps,
  buttonProps,
  iconClassName,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const authenticatedAction = useAuthenticatedAction();
  const { mutate } = useBookmarkPost();

  const Icon = isBookmarked ? BookmarkSolidIcon : BookmarkIcon;

  const bookmark = () => {
    mutate(postId, {
      onError: () => {
        setIsBookmarked((prev) => !prev);
      },
    });
    setIsBookmarked((prev) => !prev);
  };

  return (
    <Tooltip
      content={isBookmarked ? "Remove bookmark" : "Save for later"}
      {...tooltipProps}
    >
      <Button
        isIconOnly
        variant="light"
        onClick={() => authenticatedAction(bookmark)}
        {...buttonProps}
      >
        <Icon className={iconClassName} />
      </Button>
    </Tooltip>
  );
};
