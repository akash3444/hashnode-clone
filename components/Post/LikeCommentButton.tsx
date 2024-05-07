"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { HeartFilledIcon, HeartIcon } from "../icons";
import { useState } from "react";
import useLikeComment from "@/api-handlers/post/useLikeComment";

export const LikeCommentButton = ({
  myTotalReactions,
  commentId,
  totalReactions,
}: {
  myTotalReactions: number;
  commentId: string;
  totalReactions: number;
}) => {
  const [myReactions, setMyReactions] = useState(myTotalReactions);

  const authenticatedAction = useAuthenticatedAction();
  const { mutate } = useLikeComment();

  const totalLikes = totalReactions + (myReactions - myTotalReactions);

  const likeComment = () => {
    if (myReactions >= 10) return;

    mutate(
      {
        commentId,
        likesCount: 1,
      },
      {
        onError: () => {
          setMyReactions((prev) => prev - 1);
        },
      }
    );
    setMyReactions((prev) => prev + 1);
  };

  return (
    <div className="flex items-center">
      <Tooltip content="Like this comment" offset={15} delay={1000}>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onClick={() => authenticatedAction(likeComment)}
        >
          {myReactions > 0 ? (
            <HeartFilledIcon className="text-red-500 dark:text-red-500" />
          ) : (
            <HeartIcon className="text-foreground-600 dark:text-foreground-300" />
          )}
        </Button>
      </Tooltip>

      {!!totalLikes && (
        <span role="button" className="cursor-pointer text-sm">
          {totalLikes}
        </span>
      )}
    </div>
  );
};
