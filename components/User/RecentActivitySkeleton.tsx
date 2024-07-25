import Skeleton from "@/shared/Skeleton";

const RecentActivitySkelton = () => (
  <div className="space-y-4">
    {new Array(5).fill(1).map((_, index) => (
      <div key={index} className="flex space-y-2">
        {/* Left Side */}
        <div className="shrink-0 py-3 w-24 flex flex-col items-center gap-2">
          <div className="h-full border-l-2 border-primary-300 border-dotted" />
        </div>
        {/* Right Side */}
        <div className="flex-grow">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="mt-2 h-8 rounded" />
          <Skeleton className="mt-1 h-4 w-1/2 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default RecentActivitySkelton;
