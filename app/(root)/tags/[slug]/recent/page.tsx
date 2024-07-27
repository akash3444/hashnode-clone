import { ArticleListSkeleton } from "@/components/Feed";
import { TagCard, TagTabs } from "@/components/Tag";
import TagArticles from "@/components/Tag/TagArticles";
import { FC, Suspense } from "react";

interface TagProps {
  params: { slug: string };
}

const TagPage: FC<TagProps> = async ({ params: { slug } }) => {
  return (
    <>
      <TagCard slug={slug} />
      <div className="mt-12">
        <TagTabs slug={slug} />
        <Suspense fallback={<ArticleListSkeleton />}>
          <TagArticles slug={slug} sortBy="recent" />
        </Suspense>
      </div>
    </>
  );
};

export default TagPage;
