import Card, { CardBody } from "@/shared/Card";
import { Skeleton } from "@nextui-org/react";

const ConnectionCardSkeleton = () => (
  <Card className="bg-slate-100 border-0">
    <CardBody className="flex-row items-start gap-2 p-1">
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      <div className="w-full">
        <Skeleton className="mb-1 h-5 w-full rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded-full" />
      </div>
      <Skeleton className="ml-auto shrink-0 h-[26px] w-[26px] rounded-full" />
    </CardBody>
  </Card>
);

export default ConnectionCardSkeleton;
