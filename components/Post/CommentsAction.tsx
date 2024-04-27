"use client";

import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { useDisclosure } from "@nextui-org/react";
import { ChatIcon } from "../icons";
import { CommentsDrawer } from "./CommentsDrawer";

export const CommentsAction = ({ post }: { post: Article }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Tooltip content="Write a comment" offset={15} delay={1000}>
        <Button
          className="px-2.5 min-w-0 font-normal"
          variant="light"
          startContent={<ChatIcon />}
          onClick={onOpen}
        >
          {post.responseCount + post.replyCount || null}
        </Button>
      </Tooltip>
      <CommentsDrawer
        isOpen={isOpen}
        onClose={onClose}
        responseCount={post.responseCount + post.replyCount}
        authorId={post.author.id}
      />
    </>
  );
};
