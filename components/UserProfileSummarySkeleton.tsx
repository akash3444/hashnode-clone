"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";

export const UserProfileSummarySkeleton = () => {
  return (
    <Card
      shadow="none"
      className="w-full max-w-[300px] border-none bg-transparent"
    >
      <CardHeader className="justify-between gap-6">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col items-start justify-center">
            <div>
              <Skeleton className="mb-1 h-4 w-28 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-16 rounded-full" />
      </CardHeader>
      <CardBody className="px-3 py-0">
        <Skeleton className="mb-1 h-4 w-full rounded" />
        <Skeleton className="mb-1 h-4 w-full rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </CardFooter>
    </Card>
  );
};
