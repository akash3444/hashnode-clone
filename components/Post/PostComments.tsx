"use client";

import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import Typography from "@/shared/Typography";
import { Avatar, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { FC, Fragment } from "react";
import { ChatIcon } from "../icons";
import { LikeCommentButton } from "./LikeCommentButton";
import { ReplyButton } from "./ReplyButton";
import { LikeReplyButton } from "./LikeReplyButton";

interface PostCommentsProps {
  comments?: Article["comments"];
  authorId: string;
}

type ReplyProps =
  | {
      isReply: true;
      commentId: string;
    }
  | { isReply?: undefined; commentId?: undefined };

export const PostComments: FC<PostCommentsProps & ReplyProps> = ({
  comments,
  isReply,
  authorId,
  commentId,
}) =>
  comments?.edges.map(
    ({
      node: {
        id,
        myTotalReactions,
        author: { id: commenterId, name, username, profilePicture },
        dateAdded,
        content,
        totalReactions,
        replies,
      },
    }) => (
      <Fragment key={id}>
        <div
          className={cn({
            "p-6": !isReply,
            "pt-2 px-2": isReply,
          })}
        >
          {isReply && (
            <Divider className="mb-3 ml-4 h-6 w-[2px]" orientation="vertical" />
          )}
          <div>
            <div className="flex items-start gap-2">
              <Link href={`/users/${username}`}>
                <Avatar
                  src={profilePicture || DEFAULT_PROFILE_PICTURE}
                  size="sm"
                />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/users/${username}`}>
                    <Typography variant="h6" className="leading-none">
                      {name}
                    </Typography>
                  </Link>
                  {authorId === commenterId && (
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      classNames={{
                        content: "font-medium",
                      }}
                    >
                      Author
                    </Chip>
                  )}
                </div>
                <span className="text-foreground-500 text-sm">
                  {formatDate(dateAdded, "MMM dd")}
                </span>
              </div>
            </div>
            <div
              className="mt-2.5 prose prose-a:no-underline text-foreground-600 dark:text-foreground-300"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
            <div className="mt-2.5 flex items-center gap-4 text-foreground-600 dark:text-foreground-300">
              {isReply ? (
                <LikeReplyButton
                  commentId={commentId}
                  replyId={id}
                  myTotalReactions={myTotalReactions}
                  totalReactions={totalReactions}
                />
              ) : (
                <LikeCommentButton
                  commentId={id}
                  myTotalReactions={myTotalReactions}
                  totalReactions={totalReactions}
                />
              )}
              {!isReply && (
                <div className="flex items-center">
                  <Tooltip content="Like this article" offset={15} delay={1000}>
                    <Button isIconOnly variant="light" size="sm">
                      <ChatIcon className="text-foreground-600 dark:text-foreground-300" />
                    </Button>
                  </Tooltip>

                  {!!replies?.totalDocuments && (
                    <span role="button" className="cursor-pointer text-sm">
                      {replies?.totalDocuments}
                    </span>
                  )}
                </div>
              )}
              <ReplyButton />
            </div>
          </div>
          <PostComments
            comments={replies}
            isReply
            authorId={authorId}
            commentId={id}
          />
        </div>
        {!isReply && <Divider />}
      </Fragment>
    )
  );
