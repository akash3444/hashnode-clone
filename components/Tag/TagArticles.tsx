import { getTagFeed } from "@/api/tag";
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
  const feedVariables = {
    slug,
    first: 10,
    filter: { sortBy: sortBy },
  };
  const tag = await getTagFeed(feedVariables);

  return (
    <ArticleList
      initialFeed={tag}
      getMoreFeed={getTagFeed}
      feedVariables={feedVariables}
    />
  );
};

export default TagArticles;
