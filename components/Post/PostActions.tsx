"use client";

import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { Divider } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { BookmarkButton } from "../ArticleCard/BookmarkButton";
import { BulletListIcon, ShareIcon } from "../icons";
import { CommentsAction } from "./CommentsAction";
import { LikeArticleButton } from "./LikeArticleButton";
import { PeopleWhoLiked } from "./PeopleWhoLiked";
import { TableOfContentsModal } from "./TableOfContentsModal";

interface PostActionsProps {
  post: Article;
}

export const PostActions: FC<PostActionsProps> = ({ post }) => {
  const [showPeopleWhoLiked, setShowPeopleWhoLiked] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const { postId } = useParams();

  return (
    <div className="mt-10 flex max-w-max mx-auto items-center gap-2 border dark:border-foreground-800 rounded-full py-1 px-4">
      <div className="flex items-center">
        <LikeArticleButton />
        <Tooltip content="View who liked" showArrow={false} offset={23}>
          <span
            role="button"
            className="cursor-pointer hover:underline"
            onClick={() => setShowPeopleWhoLiked(true)}
          >
            {post.reactionCount}
          </span>
        </Tooltip>
      </div>
      <Divider orientation="vertical" className="h-6" />
      <CommentsAction post={post} />
      <Divider orientation="vertical" className="h-6" />
      {post.features?.tableOfContents?.isEnabled && (
        <>
          <Tooltip content="Table of contents" offset={15} delay={1000}>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setShowTableOfContents(true)}
            >
              <BulletListIcon />
            </Button>
          </Tooltip>
          <Divider orientation="vertical" className="h-6" />
        </>
      )}
      <BookmarkButton
        postId={postId as string}
        bookmarked={post.bookmarked}
        tooltipProps={{
          offset: 15,
          delay: 1000,
        }}
        iconClassName="h-[22px] w-[22px]"
      />
      <Divider orientation="vertical" className="h-6" />
      <Tooltip content="Share this article" offset={15} delay={1000}>
        <Button isIconOnly variant="light">
          <ShareIcon />
        </Button>
      </Tooltip>

      {/* Modals */}
      {showPeopleWhoLiked && (
        <PeopleWhoLiked onClose={() => setShowPeopleWhoLiked(false)} />
      )}
      {post.features?.tableOfContents?.isEnabled && showTableOfContents && (
        <TableOfContentsModal
          onClose={() => setShowTableOfContents(false)}
          tableOfContents={post.features?.tableOfContents?.items}
        />
      )}
    </div>
  );
};
