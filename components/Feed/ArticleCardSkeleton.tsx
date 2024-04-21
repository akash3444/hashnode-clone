import Card, { CardBody, CardFooter, CardHeader } from "@/shared/Card";
import Skeleton from "@/shared/Skeleton";

export const ArticleCardSkeleton = () => {
  return (
    <Card className="p-3">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="mb-1 h-4 w-60 rounded-full" />
            <Skeleton className="h-4 w-60 rounded-full" />
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-row gap-4 justify-between">
        <div className="w-full space-y-1.5">
          <Skeleton className="mb-2 h-9 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
        <Skeleton className="h-full min-w-48 aspect-video rounded-lg" />
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </CardFooter>
    </Card>
  );
};
