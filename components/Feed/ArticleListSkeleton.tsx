import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

export const ArticleListSkeleton = () => {
  return (
    <div className="space-y-6 pt-1 px-1">
      {new Array(10).fill(0).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};
