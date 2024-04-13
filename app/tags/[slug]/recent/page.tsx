import { TagCard } from "@/components/Tag";
import TagArticles from "@/components/Tag/TagArticles";
import { FC } from "react";

interface TagProps {
  params: { slug: string };
}

const TagPage: FC<TagProps> = async ({ params: { slug } }) => {
  return (
    <>
      <TagCard slug={slug} />
      <TagArticles slug={slug} sortBy="recent" />
    </>
  );
};

export default TagPage;
