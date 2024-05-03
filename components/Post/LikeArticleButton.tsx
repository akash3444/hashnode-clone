"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { HeartIcon } from "../icons";

export const LikeArticleButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const likeArticle = () => {};

  return (
    <Tooltip content="Like this article" offset={15} delay={1000}>
      <Button
        isIconOnly
        variant="light"
        onClick={() => authenticatedAction(likeArticle)}
      >
        <HeartIcon />
      </Button>
    </Tooltip>
  );
};
