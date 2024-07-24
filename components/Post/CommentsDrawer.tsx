"use client";

import { getPostComments } from "@/api-handlers/post";
import useAddComment from "@/api-handlers/post/useAddComment";
import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { POST_COMMENTS_SORT_BY } from "@/lib/constants";
import { Article, PostCommentSortBy, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import Button from "@/shared/Button";
import Select, { SelectItem } from "@/shared/Select";
import Skeleton from "@/shared/Skeleton";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { CloseIcon } from "../icons";
import { AddComment } from "./AddComment";
import { PostComments } from "./PostComments";
import { SuggestionDataItem } from "react-mentions";

interface CommentsDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  responseCount: number;
  author: User;
}

const getUsersInConversation = (
  author: User,
  comments: Article["comments"] | undefined
) => {
  let users: SuggestionDataItem[] = [
    { id: author.username, display: author.name },
  ];
  if (!comments) return users;

  const usersMap: Record<string, string> = {};

  const getUsers = (comments: Article["comments"]) =>
    comments?.edges?.forEach(
      ({
        node: {
          author: { name, username },
          replies,
        },
      }) => {
        if (!usersMap[username]) users.push({ id: username, display: name });
        usersMap[username] = name;

        if (replies) getUsers(replies);
      }
    );

  getUsers(comments);

  return users;
};

const CommentsSkeleton = () =>
  new Array(3).fill(0).map((_, index) => (
    <div key={index}>
      <div className="p-6">
        <div className="flex items-start gap-2">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="w-full">
            <Skeleton className="mb-1 h-4 w-1/2 rounded-full" />
            <Skeleton className="h-4 w-1/3 rounded-full" />
          </div>
        </div>
        <div className="mt-6">
          <Skeleton className="mb-1 h-4 w-full rounded-full" />
          <Skeleton className="mb-1 h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>
      </div>
      <Divider />
    </div>
  ));

export const CommentsDrawer: FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  responseCount,
  author,
}) => {
  const [sortBy, setSortBy] = useState(POST_COMMENTS_SORT_BY.TOP);
  const [comments, setComments] = useState<Article["comments"]>();
  const [isLoading, setIsLoading] = useState(false);

  const { postId }: { postId: string } = useParams();
  const authenticatedAction = useAuthenticatedAction();
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();

  const usersInConversation = getUsersInConversation(author, comments);

  useLockBodyScroll(isOpen);

  const fetchPostComments = async (sortCommentBy?: PostCommentSortBy) => {
    if (!isOpen) return;

    setIsLoading(true);

    const data = await getPostComments({
      postId,
      first: 10,
      after: sortCommentBy ? undefined : comments?.pageInfo?.endCursor,
      sortBy: sortCommentBy ?? sortBy,
    });

    setComments((prev) =>
      !sortCommentBy && prev
        ? { ...data, edges: [...prev.edges, ...data?.edges] }
        : data
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPostComments();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      classNames={{
        wrapper: "justify-end",
        base: "!m-0 h-[100dvh] overflow-y-auto rounded-none",
      }}
      onClose={onClose}
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "linear",
            },
          },
          exit: {
            x: 100,
            opacity: 0,
            transition: {
              duration: 0.1,
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-1 text-xl">
          Comments {responseCount ? `(${responseCount})` : ""}
          <Button isIconOnly variant="light" size="sm" onClick={onClose}>
            <CloseIcon />
          </Button>
        </ModalHeader>
        <ModalBody className="p-0">
          <AddComment
            usersInConversation={usersInConversation}
            isAdding={isAddingComment}
            onAdd={(comment, onSuccess) =>
              authenticatedAction(() =>
                addComment(
                  {
                    postId,
                    contentMarkdown: comment,
                  },
                  {
                    onSuccess: ({ comment }) => {
                      toast.success("Comment added");
                      setComments((prev) =>
                        prev
                          ? {
                              ...prev,
                              edges: [{ node: comment }, ...prev.edges],
                            }
                          : undefined
                      );
                      onSuccess();
                    },
                  }
                )
              )
            }
          />

          <Divider />

          {/* Comments list */}
          <div className="pt-2 px-6">
            <Select
              size="sm"
              selectedKeys={[sortBy]}
              className="w-40"
              variant="bordered"
              classNames={{
                trigger: "rounded-md shadow-none",
                value: "font-medium",
              }}
              onChange={(e) => {
                setSortBy(e.target.value as PostCommentSortBy);
                fetchPostComments(e.target.value as PostCommentSortBy);
              }}
            >
              <SelectItem key={POST_COMMENTS_SORT_BY.TOP}>
                Top Comments
              </SelectItem>
              <SelectItem key={POST_COMMENTS_SORT_BY.RECENT}>
                New Comments
              </SelectItem>
            </Select>
          </div>
          {isLoading && (
            <div
              className={cn({
                "mt-5": !!comments?.edges.length,
              })}
            >
              <CommentsSkeleton />
            </div>
          )}
          <InfiniteScroll
            hasMore={comments?.pageInfo.hasNextPage ?? true}
            loader={
              <div
                className={cn({
                  "mt-5": !!comments?.edges.length,
                })}
              >
                <CommentsSkeleton />
              </div>
            }
            next={fetchPostComments}
            dataLength={comments?.edges?.length || 0}
            scrollableTarget="people-who-liked"
            scrollThreshold="507px" // Skeleton height
            endMessage={
              <p className="mt-8 mb-4 text-center text-sm font-semibold text-foreground-600">
                {comments?.edges?.length
                  ? "You've reached the end! 👋"
                  : "There are no comments yet"}
              </p>
            }
          >
            <div>
              <PostComments comments={comments} authorId={author.id} />
            </div>
          </InfiniteScroll>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
