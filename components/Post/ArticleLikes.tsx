"use client";

import useLikePost from "@/api-handlers/post/useLikePost";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { useParams } from "next/navigation";
import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "../icons";
import { PeopleWhoLiked } from "./PeopleWhoLiked";

export const ArticleLikes = ({
  likesCount,
  reactionCount,
}: {
  likesCount: number;
  reactionCount: number;
}) => {
  const [likes, setLikes] = useState(likesCount);
  const [showPeopleWhoLiked, setShowPeopleWhoLiked] = useState(false);

  const authenticatedAction = useAuthenticatedAction();
  const { postId }: { postId: string } = useParams();
  const { mutate } = useLikePost();

  const likePost = () => {
    if (likes < 10) {
      mutate(
        { postId, likesCount: 1 },
        {
          onError: () => {
            setLikes((prev) => prev - 1);
          },
        }
      );
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <Tooltip content="Like this article" offset={15} delay={1000}>
          <Button
            isIconOnly
            variant="light"
            onClick={() => authenticatedAction(likePost)}
          >
            {likes > 0 ? (
              <HeartFilledIcon className="text-red-500" />
            ) : (
              <HeartIcon />
            )}
          </Button>
        </Tooltip>

        <Tooltip content="View who liked" showArrow={false} offset={23}>
          <span
            role="button"
            className="cursor-pointer hover:underline"
            onClick={() => setShowPeopleWhoLiked(true)}
          >
            {reactionCount + (likes - likesCount)}
          </span>
        </Tooltip>
      </div>

      {showPeopleWhoLiked && (
        <PeopleWhoLiked onClose={() => setShowPeopleWhoLiked(false)} />
      )}
    </>
  );
};
