import { GET_DISCUSSIONS_TOP_COMMENTERS, GET_FEED } from "@/graphql/queries";
import { PageInfo, Article, FeedType, Author } from "../lib/types";

export type Feed = { edges: { node: Article }[]; pageInfo: PageInfo };
export type TopCommenters = { edges: { node: Author }[] };

export interface FeedVariables {
  first: number;
  filter?: { type: FeedType };
  after?: string;
  commentsFirst: number;
}

export const getFeed = async (variables: FeedVariables): Promise<Feed> => {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
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
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_DISCUSSIONS_TOP_COMMENTERS,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.topCommenters;
};
