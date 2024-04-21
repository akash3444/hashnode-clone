"use client";

import { getPostComments } from "@/api/post";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { POST_COMMENTS_SORT_BY } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn } from "@/lib/utils";
import Button from "@/shared/Button";
import Select, { SelectItem } from "@/shared/Select";
import Skeleton from "@/shared/Skeleton";
import {
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowUpRightIcon, CloseIcon } from "../icons";
import { PostComments } from "./PostComments";

interface CommentsDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  responseCount: number;
  authorId: string;
}

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
  authorId,
}) => {
  const [filterBy, setFilterBy] = useState("top");
  const [comments, setComments] = useState<Article["comments"]>();
  const { postId } = useParams();
  useLockBodyScroll(isOpen);

  const fetchPostComments = async (isFilterApplied?: boolean) => {
    if (!isOpen) return;

    const data = await getPostComments({
      postId: postId as string,
      first: 10,
      after: isFilterApplied ? undefined : comments?.pageInfo?.endCursor,
      sortBy: POST_COMMENTS_SORT_BY.TOP,
    });

    setComments((prev) =>
      prev ? { ...data, edges: [...prev.edges, ...data?.edges] } : data
    );
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
          <div className="pt-6 px-6 flex flex-col gap-2">
            <Textarea
              variant="flat"
              placeholder="Write a thoughtful comment"
              classNames={{
                inputWrapper:
                  "bg-transparent min-h-[100px] group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent shadow-none p-0",
              }}
              minRows={5}
              maxRows={5}
            />
            <div className="flex items-center justify-between">
              <Link
                color="foreground"
                className="gap-2 text-xs"
                href="https://hashnode.com/code-of-conduct"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
                Code of conduct
              </Link>
              <Button className="ml-auto" size="sm" color="primary">
                Comment
              </Button>
            </div>
          </div>

          <Divider />

          {/* Comments list */}
          <div className="pt-2 px-6">
            <Select
              size="sm"
              selectedKeys={[filterBy]}
              className="w-40"
              variant="bordered"
              classNames={{
                trigger: "rounded-md shadow-none",
                value: "font-medium",
              }}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <SelectItem key="top">Top Comments</SelectItem>
              <SelectItem key="new">New Comments</SelectItem>
            </Select>
          </div>

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
            dataLength={comments?.edges.length || 0}
            scrollableTarget="people-who-liked"
            scrollThreshold="507px" // Skeleton height
            endMessage={
              <p className="mt-8 mb-4 text-center text-sm font-semibold text-foreground-600">
                You&apos;ve reached the end! 👋
              </p>
            }
          >
            <div>
              <PostComments comments={comments} authorId={authorId} />
            </div>
          </InfiniteScroll>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
