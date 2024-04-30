"use client";

import { toggleFollowUser } from "@/api/user";
import Button from "@/shared/Button";
import { useParams } from "next/navigation";
import { useState } from "react";

export const UserFollowButton = ({ following }: { following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const { username } = useParams();

  const toggleFollow = async () => {
    const isToggled = await toggleFollowUser(username as string);

    if (isToggled) setIsFollowing((prev) => !prev);
  };

  return (
    <Button color="primary" onClick={toggleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};
