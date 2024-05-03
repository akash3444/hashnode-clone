"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { HeartIcon } from "../icons";

export const LikeCommentButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const likeComment = () => {};

  return (
    <Tooltip content="Like this comment" offset={15} delay={1000}>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onClick={() => authenticatedAction(likeComment)}
      >
        <HeartIcon className="text-foreground-600 dark:text-foreground-300" />
      </Button>
    </Tooltip>
  );
};
