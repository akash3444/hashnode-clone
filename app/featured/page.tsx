import ArticleList from "@/components/ArticleList";
import ArticleListSkeleton from "@/components/ArticleListSkeleton";
import ArticleTabs from "@/components/ArticleTabs";
import { Suspense } from "react";

export default function Featured() {
  return (
    <main className="py-3 max-w-3xl mx-auto">
      <ArticleTabs />
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList feedType="FEATURED" />
      </Suspense>
    </main>
  );
}
