import { getTagFeed } from "@/api/tag";
import { FC } from "react";
import ArticleList from "../Feed/ArticleList";
import { TagTabs } from "./TagTabs";

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
    <div className="mt-12">
      <TagTabs slug={slug} />
      <ArticleList
        initialFeed={tag}
        getMoreFeed={getTagFeed}
        feedVariables={feedVariables}
      />
    </div>
  );
};

export default TagArticles;
