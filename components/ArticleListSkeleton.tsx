import ArticleCardSkeleton from "./ArticleCardSkeleton";

const ArticleListSkeleton = () => {
  return (
    <div className="space-y-6">
      {new Array(10).fill(0).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ArticleListSkeleton;
