import { getFeed } from "@/api/feed";
import { FeedType } from "@/lib/types";
import { FC } from "react";
import ArticleList from "./ArticleList";

interface FeedProps {
  feedType?: FeedType;
}

const Feed: FC<FeedProps> = async ({ feedType = "RELEVANT" }) => {
  const feedVariables = {
    first: 10,
    commentsFirst: 1,
    filter: { type: feedType },
  };
  const initialFeed = await getFeed(feedVariables);

  return (
    <ArticleList initialFeed={initialFeed} feedVariables={feedVariables} />
  );
};

export default Feed;
