import { Skeleton } from "@nextui-org/skeleton";

const ChallengesSkeleton = () => {
  return (
    <div className="space-y-6">
      {new Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex items-start gap-5">
          <div className="flex-1">
            <Skeleton className="h-6 w-full rounded-full mb-1.5" />
            <Skeleton className="h-3 w-full rounded-full mb-1" />
            <Skeleton className="h-3 w-1/3 rounded-full" />
          </div>
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default ChallengesSkeleton;
