import ArticleCard from "@/components/ArticleCard";
import { getFeed } from "@/lib/api";
import { FeedType } from "@/lib/types";
import { FC } from "react";

interface ArticleListProps {
  feedType?: FeedType;
}

const ArticleList: FC<ArticleListProps> = async ({ feedType = "RELEVANT" }) => {
  const feed = await getFeed({
    first: 10,
    commentsFirst: 1,
    filter: { type: feedType },
  });

  return (
    <div className="space-y-6">
      {feed?.edges?.map(({ node }) => (
        <ArticleCard key={node.id} article={node} />
      ))}
    </div>
  );
};

export default ArticleList;
