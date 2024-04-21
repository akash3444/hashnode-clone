import { getPostLikes } from "@/api/post";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn } from "@/lib/utils";
import Button from "@/shared/Button";
import Skeleton from "@/shared/Skeleton";
import Typography from "@/shared/Typography";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CloseIcon } from "../icons";

interface PeopleWhoLikedProps {
  onClose: ModalProps["onClose"];
}

const PeopleListSkeleton = () => (
  <div className="space-y-2">
    {new Array(7).fill(0).map((_, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="shrink-0 h-10 w-10 rounded-full" />
          <div className="w-full">
            <Skeleton className="mb-1.5 h-5 w-40 rounded-full" />
            <Skeleton className="h-[17px] w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
    ))}
  </div>
);

export const PeopleWhoLiked: FC<PeopleWhoLikedProps> = ({ onClose }) => {
  const [likedBy, setLikedBy] = useState<Article["likedBy"]>();
  const { postId } = useParams();

  const fetchPeopleWhoLiked = async () => {
    const data = await getPostLikes({
      postId: postId as string,
      first: 10,
      after: likedBy?.pageInfo?.endCursor,
    });

    setLikedBy((prev) =>
      prev
        ? { ...data?.likedBy, edges: [...prev.edges, ...data.likedBy?.edges] }
        : data?.likedBy
    );
  };

  useEffect(() => {
    fetchPeopleWhoLiked();
  }, []);

  return (
    <Modal isOpen onClose={onClose} hideCloseButton disableAnimation>
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-1">
          People Who Liked
          <Button isIconOnly variant="light" size="sm" onClick={onClose}>
            <CloseIcon />
          </Button>
        </ModalHeader>
        <ModalBody
          id="people-who-liked"
          className="max-h-[370px] overflow-y-auto"
        >
          <InfiniteScroll
            hasMore={likedBy?.pageInfo.hasNextPage ?? true}
            loader={
              <div
                className={cn({
                  "mt-5": !!likedBy?.edges.length,
                })}
              >
                <PeopleListSkeleton />
              </div>
            }
            next={fetchPeopleWhoLiked}
            dataLength={likedBy?.edges.length || 0}
            scrollableTarget="people-who-liked"
            scrollThreshold="348px" // Skeleton height
            endMessage={
              <p className="mt-8 mb-4 text-center text-sm font-semibold text-foreground-600">
                You&apos;ve reached the end! 👋
              </p>
            }
          >
            <div className="space-y-2">
              {likedBy?.edges.map(
                ({
                  node: { id, name, profilePicture, username },
                  reactionCount,
                }) => (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar src={profilePicture || DEFAULT_PROFILE_PICTURE} />
                      <div>
                        <Typography variant="h6">{name}</Typography>
                        <span className="text-foreground-500 text-sm">
                          @{username}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-foreground-500">
                      {reactionCount} {reactionCount === 1 ? "like" : "likes"}
                    </span>
                  </div>
                )
              )}
            </div>
          </InfiniteScroll>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
