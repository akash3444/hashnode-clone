"use client";

import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { Divider } from "@nextui-org/react";
import { FC, useState } from "react";
import { BookmarkIcon, BulletListIcon, HeartIcon, ShareIcon } from "../icons";
import { CommentsAction } from "./CommentsAction";
import { PeopleWhoLiked } from "./PeopleWhoLiked";
import { TableOfContentsModal } from "./TableOfContentsModal";

interface PostActionsProps {
  post: Article;
}

export const PostActions: FC<PostActionsProps> = ({ post }) => {
  const [showPeopleWhoLiked, setShowPeopleWhoLiked] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  return (
    <div className="mt-10 flex max-w-max mx-auto items-center gap-2 border rounded-full py-1 px-4">
      <div className="flex items-center">
        <Tooltip
          content="Like this article"
          showArrow={false}
          offset={15}
          delay={1000}
        >
          <Button isIconOnly variant="light">
            <HeartIcon />
          </Button>
        </Tooltip>
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
          <Tooltip
            content="Table of contents"
            showArrow={false}
            offset={15}
            delay={1000}
          >
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
      <Tooltip
        content="Add Bookmark"
        showArrow={false}
        offset={15}
        delay={1000}
      >
        <Button isIconOnly variant="light">
          <BookmarkIcon />
        </Button>
      </Tooltip>
      <Divider orientation="vertical" className="h-6" />
      <Tooltip
        content="Share this article"
        showArrow={false}
        offset={15}
        delay={1000}
      >
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
