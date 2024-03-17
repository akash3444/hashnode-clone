"use client";

import { Feed, FeedVariables, getFeed } from "@/lib/api";
import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../ArticleCard";
import { ArticleListSkeleton } from "./ArticleListSkeleton";

interface ArticleListProps {
  initialFeed: Feed;
  feedVariables: FeedVariables;
}

const ArticleList: FC<ArticleListProps> = ({ initialFeed, feedVariables }) => {
  const [feed, setFeed] = useState<Feed>(initialFeed);

  const fetchMoreFeed = async () => {
    const newFeed = await getFeed({
      ...feedVariables,
      after: feed.pageInfo.endCursor,
    });

    setFeed((prev) => ({
      edges: [...prev.edges, ...newFeed.edges],
      pageInfo: newFeed.pageInfo,
    }));
  };

  return (
    <InfiniteScroll
      hasMore={feed.pageInfo.hasNextPage}
      loader={
        <div className="mt-5">
          <ArticleListSkeleton />
        </div>
      }
      next={fetchMoreFeed}
      dataLength={feed?.edges?.length}
      scrollThreshold="2850px" // Height of the skeleton because loader is always visible
    >
      <div className="space-y-6 pt-1 px-1">
        {feed?.edges?.map(({ node }) => (
          <ArticleCard key={node.id} article={node} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ArticleList;
