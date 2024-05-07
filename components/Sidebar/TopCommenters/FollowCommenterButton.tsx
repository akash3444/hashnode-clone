"use client";

import useFollowUser from "@/api-handlers/user/useFollowUser";
import { CheckIcon, FollowIcon } from "@/components/icons";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { useState } from "react";

export const FollowCommenterButton = ({
  following,
  username,
}: {
  following: boolean;
  username: string;
}) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const authenticatedAction = useAuthenticatedAction();
  const { mutate } = useFollowUser();

  const toggleFollow = async () => {
    mutate(username, {
      onError: () => setIsFollowing((prev) => !prev),
    });
    setIsFollowing((prev) => !prev);
  };

  return (
    <Tooltip content={isFollowing ? "Unfollow" : "Follow"}>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => authenticatedAction(toggleFollow)}
      >
        {isFollowing ? <CheckIcon /> : <FollowIcon />}
      </Button>
    </Tooltip>
  );
};
