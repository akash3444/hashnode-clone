import { GET_FEED } from "@/graphql/queries";
import { PageInfo, Article, FeedType } from "./types";

export type Feed = { edges: { node: Article }[]; pageInfo: PageInfo };

export interface FeedVariables {
  first: number;
  filter?: { type: FeedType };
  after?: string;
  commentsFirst: number;
}

export const getFeed = async (variables: FeedVariables): Promise<Feed> => {
  const res = await fetch("https://gql.hashnode.com/", {
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
