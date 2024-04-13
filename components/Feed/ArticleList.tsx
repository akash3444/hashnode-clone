"use client";

import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../ArticleCard";
import { ArticleListSkeleton } from "./ArticleListSkeleton";
import { Feed, FeedVariables, getFeed } from "@/api/feed";

interface ArticleListProps {
  initialFeed: Feed;
  feedVariables: FeedVariables;
  // TODO: define type for feedVariables
  getMoreFeed?: (feedVariables: any) => Promise<Feed>;
}

const ArticleList: FC<ArticleListProps> = ({
  initialFeed,
  feedVariables,
  getMoreFeed = getFeed,
}) => {
  const [feed, setFeed] = useState<Feed>(initialFeed);

  const fetchMoreFeed = async () => {
    const newFeed = await getMoreFeed({
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
      <div className="space-y-6">
        {feed?.edges?.map(({ node }) => (
          <ArticleCard key={node.id} article={node} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ArticleList;
