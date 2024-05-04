"use client";

import { Feed, FeedVariables, getFeed } from "@/api/feed";
import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../ArticleCard";
import { ArticleListSkeleton } from "./ArticleListSkeleton";

interface ArticleListProps {
  initialFeed: Feed;
  feedVariables: FeedVariables;
  // TODO: define type for feedVariables
  getMoreFeed?: (
    feedVariables: any,
    accessToken: string | undefined
  ) => Promise<Feed>;
  accessToken?: string;
}

const ArticleList: FC<ArticleListProps> = ({
  initialFeed,
  feedVariables,
  getMoreFeed = getFeed,
  accessToken,
}) => {
  const [feed, setFeed] = useState<Feed>(initialFeed);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreFeed = async () => {
    setIsLoading(true);
    const newFeed = await getMoreFeed(
      {
        ...feedVariables,
        after: feed.pageInfo.endCursor,
      },
      accessToken
    );

    setFeed((prev) => ({
      edges: [...prev.edges, ...newFeed.edges],
      pageInfo: newFeed.pageInfo,
    }));
    setIsLoading(false);
  };

  return (
    <InfiniteScroll
      hasMore={feed.pageInfo.hasNextPage}
      loader={
        isLoading && (
          <div className="mt-5">
            <ArticleListSkeleton />
          </div>
        )
      }
      next={fetchMoreFeed}
      dataLength={feed?.edges?.length}
      scrollThreshold="10px"
    >
      <div className="md:space-y-6">
        {feed?.edges?.map(({ node }) => (
          <ArticleCard key={node.id} article={node} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ArticleList;
