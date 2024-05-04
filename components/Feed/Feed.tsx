import { getFeed } from "@/api/feed";
import { getAccessToken } from "@/lib/auth";
import { FeedType } from "@/lib/types";
import { FC } from "react";
import ArticleList from "./ArticleList";

interface FeedProps {
  feedType?: FeedType;
}

const Feed: FC<FeedProps> = async ({ feedType = "RELEVANT" }) => {
  const accessToken = await getAccessToken();
  const feedVariables = {
    first: 10,
    commentsFirst: 1,
    filter: { type: feedType },
  };
  const initialFeed = await getFeed(feedVariables, accessToken);

  return (
    <ArticleList
      initialFeed={initialFeed}
      feedVariables={feedVariables}
      accessToken={accessToken}
    />
  );
};

export default Feed;
