import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

export const ArticleListSkeleton = () => {
  return (
    <div className="md:space-y-6">
      {new Array(10).fill(0).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};
