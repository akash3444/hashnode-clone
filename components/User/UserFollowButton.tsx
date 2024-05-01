"use client";

import { toggleFollowUser } from "@/api/user";
import Button from "@/shared/Button";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckIcon } from "../icons";

export const UserFollowButton = ({ following }: { following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const { username } = useParams();

  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    const isToggled = await toggleFollowUser(username as string);

    if (!isToggled) setIsFollowing((prev) => !prev);
  };

  return (
    <Button
      color="primary"
      variant={isFollowing ? "bordered" : "solid"}
      onClick={toggleFollow}
      startContent={isFollowing && <CheckIcon />}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};
