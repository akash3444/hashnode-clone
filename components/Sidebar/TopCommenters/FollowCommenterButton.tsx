"use client";

import { CheckIcon, FollowIcon } from "@/components/icons";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";

export const FollowCommenterButton = ({
  following,
}: {
  following: boolean;
}) => {
  const authenticatedAction = useAuthenticatedAction();

  const follow = () => {};

  return (
    <Tooltip content={following ? "Unfollow" : "Follow"}>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        onClick={() => authenticatedAction(follow)}
      >
        {following ? <CheckIcon className="text-success" /> : <FollowIcon />}
      </Button>
    </Tooltip>
  );
};
