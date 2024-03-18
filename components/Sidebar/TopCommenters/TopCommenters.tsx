import Card, { CardBody, CardHeader } from "@/shared/Card";
import TopCommenterList from "./TopCommenterList";
import TopCommenterListSkeleton from "./TopCommenterListSkeleton";
import { Suspense } from "react";

const TopCommenters = async () => {
  return (
    <Card>
      <CardHeader className="pt-2 justify-between gap-5">
        <h2 className="text-xl font-bold shrink-0">Top commenters this week</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        <Suspense fallback={<TopCommenterListSkeleton />}>
          <TopCommenterList />
        </Suspense>
      </CardBody>
    </Card>
  );
};

export default TopCommenters;
