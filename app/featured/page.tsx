import Feed from "@/components/Feed";
import { ArticleListSkeleton } from "@/components/Feed";
import { ArticleTabs } from "@/components/Feed";
import { Suspense } from "react";

export default function Featured() {
  return (
    <main className="py-3 max-w-3xl mx-auto">
      <ArticleTabs />
      <Suspense fallback={<ArticleListSkeleton />}>
        <Feed feedType="FEATURED" />
      </Suspense>
    </main>
  );
}
