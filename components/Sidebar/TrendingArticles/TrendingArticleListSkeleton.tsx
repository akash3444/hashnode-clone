import { CardBody } from "@/shared/Card";
import Skeleton from "@/shared/Skeleton";

const TrendingArticleListSkeleton = () => {
  return (
    <CardBody className="space-y-6">
      {new Array(3).fill(0).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="mt-1 mb-1.5 h-4 w-2/3 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      ))}
      <Skeleton className="h-10 w-full rounded-full" />
    </CardBody>
  );
};

export default TrendingArticleListSkeleton;
