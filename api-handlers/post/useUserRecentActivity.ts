import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserRecentActivity } from "../user";

const useUserRecentActivity = (username: string) => {
  return useInfiniteQuery({
    queryKey: ["recentActivity", username],
    queryFn: ({ pageParam }) =>
      getUserRecentActivity({ page: pageParam, username }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.activitiesGroupedByDate?.length
        ? pages.length
        : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 0,
  });
};

export default useUserRecentActivity;
