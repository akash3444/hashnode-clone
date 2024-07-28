"use server";

import { GET_DRAFT } from "@/graphql/queries";
import { getAccessToken } from "@/lib/auth";
import { Draft } from "@/lib/types";
import { getGraphQlEndpoint } from "@/lib/utils";

export const getDraft = async (variables: { id: string }): Promise<Draft> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_DRAFT,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.draft;
};
