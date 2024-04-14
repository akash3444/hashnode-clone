import ConnectionCardSkeleton from "./ConnectionCardSkeleton";

export const ConnectionListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {new Array(10).fill(0).map((_, index) => (
        <ConnectionCardSkeleton key={index} />
      ))}
    </div>
  );
};
