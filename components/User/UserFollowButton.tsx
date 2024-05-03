"use client";

import { toggleFollowUser } from "@/api/user";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckIcon } from "../icons";

export const UserFollowButton = ({
  following,
  className,
}: {
  following: boolean;
  className?: string;
}) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const { username } = useParams();
  const authenticatedAction = useAuthenticatedAction();

  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    const isToggled = await toggleFollowUser(username as string);

    if (!isToggled) setIsFollowing((prev) => !prev);
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
