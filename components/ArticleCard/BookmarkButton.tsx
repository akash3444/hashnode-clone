"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { BookmarkIcon, BookmarkSolidIcon } from "../icons";

export const BookmarkButton = ({ bookmarked }: { bookmarked: boolean }) => {
  const authenticatedAction = useAuthenticatedAction();

  const bookmarkArticle = () => {};

  return (
    <Tooltip content={bookmarked ? "Remove bookmark" : "Save for later"}>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => authenticatedAction(bookmarkArticle)}
      >
        {bookmarked ? (
          <BookmarkSolidIcon className="text-foreground-500" />
        ) : (
          <BookmarkIcon className="h-4 w-4 text-foreground-500" />
        )}
      </Button>
    </Tooltip>
  );
};
