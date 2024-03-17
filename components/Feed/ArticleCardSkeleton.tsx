import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export const ArticleCardSkeleton = () => {
  return (
    <Card className="max-w-3xl p-3" shadow="sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="mb-1 h-4 w-60 rounded" />
            <Skeleton className="h-4 w-60 rounded" />
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-row gap-4 justify-between">
        <div className="w-full space-y-1.5">
          <Skeleton className="mb-2 h-9 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
        </div>
        <Skeleton className="h-full min-w-48 aspect-video rounded-lg" />
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <Skeleton className="h-5 w-20 rounded" />
      </CardFooter>
    </Card>
  );
};
