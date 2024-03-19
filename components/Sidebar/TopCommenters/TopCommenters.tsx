import Card, { CardBody, CardHeader } from "@/shared/Card";
import TopCommenterList from "./TopCommenterList";
import TopCommenterListSkeleton from "./TopCommenterListSkeleton";
import { Suspense } from "react";
import Typography from "@/shared/Typography";

const TopCommenters = async () => {
  return (
    <Card>
      <CardHeader className="pt-2 justify-between gap-5">
        <Typography variant="h2" className="shrink-0">
          Top commenters this week
        </Typography>
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
