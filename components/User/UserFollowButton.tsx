"use client";

import useFollowUser from "@/api-handlers/user/useFollowUser";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckIcon } from "../icons";

export const UserFollowButton = ({
  following,
  className,
  username,
}: {
  following: boolean;
  className?: string;
  username?: string;
}) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const params = useParams();
  const authenticatedAction = useAuthenticatedAction();
  const { mutate } = useFollowUser();

  const toggleFollow = async () => {
    mutate(username ?? (params.username as string), {
      onError: () => setIsFollowing((prev) => !prev),
    });
    setIsFollowing((prev) => !prev);
  };

  return (
    <Button
      color="primary"
      variant={isFollowing ? "bordered" : "solid"}
      onClick={() => authenticatedAction(toggleFollow)}
      startContent={isFollowing && <CheckIcon />}
      className={className}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};
