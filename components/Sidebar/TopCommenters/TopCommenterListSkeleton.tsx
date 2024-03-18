import { Skeleton } from "@nextui-org/skeleton";

const TopCommenterListSkeleton = () => {
  return new Array(5).fill(0).map((_, index) => (
    <div key={index} className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-2/3 rounded-full" />
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  ));
};

export default TopCommenterListSkeleton;
