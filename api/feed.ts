import { GET_DISCUSSIONS_TOP_COMMENTERS, GET_FEED } from "@/graphql/queries";
import { PageInfo, Article, FeedType, User, UserProfile } from "../lib/types";
import { getAccessToken } from "@/lib/auth";
import { getGraphQlEndpoint } from "@/lib/utils";

export type Feed = { edges: { node: Article }[]; pageInfo: PageInfo };
export type TopCommenters = { edges: { node: User }[] };

export interface FeedVariables {
  first: number;
  filter?: { type?: FeedType; sortBy?: string };
  after?: string;
  slug?: string;
  commentsFirst?: number;
}

export const getFeed = async (variables: FeedVariables): Promise<Feed> => {
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_FEED,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.feed;
};

export const getTopCommenters = async (): Promise<TopCommenters> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_DISCUSSIONS_TOP_COMMENTERS,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.topCommenters;
};

export const getUserProfileSummary = async (
  userId: string
): Promise<UserProfile> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HASHNODE_REST_API_URL}/profile/profile-sheet?userId=${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data;
};
