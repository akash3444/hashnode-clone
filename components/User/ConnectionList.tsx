"use client";

import { getUserConnections } from "@/api/user";
import { ConnectionType, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FC, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ConnectionCard from "./ConnectionCard";
import { ConnectionListSkeleton } from "./ConnectionListSkeleton";

interface ConnectionListProps {
  username: string;
  type: ConnectionType;
}

const ConnectionList: FC<ConnectionListProps> = ({ username, type }) => {
  const [connections, setConnections] = useState<User[]>();
  const currentPage = useRef(-1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async (page?: number) => {
    setIsLoading(true);
    currentPage.current = page ? page : currentPage.current + 1;
    const connections = await getUserConnections({
      page: page ?? currentPage.current,
      username,
      type,
    });

    if (!connections?.length) setHasMore(false);
    setIsLoading(false);
    setConnections((prev) => (prev ? [...prev, ...connections] : connections));
  };

  useEffect(() => {
    fetchConnections(0);
    fetchConnections(1);
  }, []);

  if (!isLoading && !connections?.length)
    return (
      <div className="min-h-[456px] flex items-center justify-center">
        <span className="text-foreground-500">No {type}</span>
      </div>
    );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<ConnectionListSkeleton />}
      next={fetchConnections}
      dataLength={connections?.length || 0}
      scrollThreshold="350px" // Height of the skeleton because loader is always visible
      initialScrollY={100}
    >
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", {
          "mb-4": !!connections?.length,
        })}
      >
        {connections?.map((user) => (
          <ConnectionCard key={user.id} {...user} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ConnectionList;
