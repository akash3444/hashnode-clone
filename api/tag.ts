"use server";

import { GET_TAG, GET_TAG_FEED } from "@/graphql/queries";
import { Tag } from "@/lib/types";
import { Feed } from "./feed";
import { getGraphQlEndpoint } from "@/lib/utils";
import { getAccessToken } from "@/lib/auth";

interface TagFeedVariables {
  slug: Tag["slug"];
  first: number;
  filter: { sortBy: "popular" | "recent" | "trending" };
}
interface TagVariables {
  slug: Tag["slug"];
}

export const getTag = async (variables: TagVariables): Promise<Tag> => {
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_TAG,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.tag;
};

export const getTagFeed = async (
  variables: TagFeedVariables
): Promise<Feed> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_TAG_FEED,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.tag?.feed;
};
