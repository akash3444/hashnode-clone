"use client";

import useUserRecentActivity from "@/api-handlers/post/useUserRecentActivity";
import { capitalize } from "@/lib/utils";
import Button from "@/shared/Button";
import Card, { CardBody } from "@/shared/Card";
import Typography from "@/shared/Typography";
import { formatDate } from "date-fns/format";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown } from "../icons";
import { ActivitiesGroupedByDate } from "@/api-handlers/user";
import RecentActivitySkelton from "./RecentActivitySkeleton";

const getActivity = (type: string, reason: string) => {
  switch (type) {
    case "story.written":
      return "Wrote an article";
    case "response.replied":
      return "Replied";
    default:
      return capitalize(reason);
  }
};

const RecentActivity = () => {
  const { username }: { username: string } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useUserRecentActivity(username);

  return (
    <Card className="lg:col-span-2">
      <CardBody>
        <Typography variant="h2" className="mb-3">
          Recent Activity
        </Typography>

        <div>
          {isFetching && !data?.pages?.length ? (
            <RecentActivitySkelton />
          ) : (
            data?.pages.map(({ activitiesGroupedByDate }, index) => (
              <GroupedActivities
                key={index}
                activitiesGroupedByDate={activitiesGroupedByDate}
              />
            ))
          )}
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetching || isFetchingNextPage}
              className="ml-24 mt-4"
              size="md"
              color="primary"
              isLoading={isFetching || isFetchingNextPage}
            >
              {!isFetching && !isFetchingNextPage && (
                <ChevronDown className="h-5 w-5" />
              )}
              Show More
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const GroupedActivities = ({
  activitiesGroupedByDate,
}: {
  activitiesGroupedByDate: ActivitiesGroupedByDate;
}) => {
  return activitiesGroupedByDate.map(({ date, activities }) => (
    <div key={date} className="flex space-y-2">
      {/* Left Side */}
      <div className="shrink-0 py-3 w-24 flex flex-col items-center gap-2">
        <span className="text-slate-500 text-sm">
          {formatDate(date, "MMM dd")}
        </span>
        <div className="h-full border-l-2 border-primary-300 border-dotted" />
      </div>
      {/* Right Side */}
      <div className="flex-grow">
        {activities.map(({ _id, type, reason, post: { title, id } }) => (
          <div
            key={_id}
            className="border-b dark:border-slate-800 first:pt-0 py-3"
          >
            <span className="text-slate-500 text-sm">
              {getActivity(type, reason)}
            </span>
            <Link href={`/posts/${id}`}>
              <Typography variant="h5" className="mt-1">
                {title}
              </Typography>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ));
};

export default RecentActivity;
