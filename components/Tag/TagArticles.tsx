import { getTagFeed } from "@/api/tag";
import { getAccessToken } from "@/lib/auth";
import { FC } from "react";
import ArticleList from "../Feed/ArticleList";

interface TagArticlesProps {
  slug: string;
  sortBy?: "popular" | "recent";
}

const TagArticles: FC<TagArticlesProps> = async ({
  slug,
  sortBy = "popular",
}) => {
  const accessToken = await getAccessToken();
  const feedVariables = {
    slug,
    first: 10,
    filter: { sortBy: sortBy },
  };
  const tag = await getTagFeed(feedVariables, accessToken);

  return (
    <ArticleList
      initialFeed={tag}
      getMoreFeed={getTagFeed}
      feedVariables={feedVariables}
      accessToken={accessToken}
    />
  );
};

export default TagArticles;
