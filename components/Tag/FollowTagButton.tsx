"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";

export const FollowTagButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const followTag = () => {};

  return (
    <Button
      size="sm"
      color="primary"
      className="font-medium"
      onClick={() => authenticatedAction(followTag)}
    >
      Follow tag
    </Button>
  );
};
