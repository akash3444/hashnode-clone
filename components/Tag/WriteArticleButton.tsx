"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";

export const WriteArticleButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const handleClick = () => {};

  return (
    <Button
      size="sm"
      variant="bordered"
      className="font-medium"
      onClick={() => authenticatedAction(handleClick)}
    >
      Write an article
    </Button>
  );
};
