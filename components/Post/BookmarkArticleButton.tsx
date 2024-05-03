"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { BookmarkIcon } from "../icons";

export const BookmarkArticleButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const bookmarkArticle = () => {};

  return (
    <Tooltip content="Add Bookmark" offset={15} delay={1000}>
      <Button
        isIconOnly
        variant="light"
        onClick={() => authenticatedAction(bookmarkArticle)}
      >
        <BookmarkIcon />
      </Button>
    </Tooltip>
  );
};
