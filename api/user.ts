"use server";

import { TOGGLE_FOLLOW_USER } from "@/graphql/mutations";
import { GET_USER, GET_USER_INFO } from "@/graphql/queries";
import { getAccessToken } from "@/lib/auth";
import { ConnectionType, User } from "@/lib/types";

interface GetUserConnectionsVariables {
  username: string;
  page: number;
  type: ConnectionType;
}

export const getUser = async (username: string): Promise<User> => {
  const accessToken = (await getAccessToken()) || "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers,

    body: JSON.stringify({
      query: GET_USER,
      variables: { username },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.user;
};

export const getUserInfo = async (username: string): Promise<User> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_USER_INFO,
      variables: { username },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.user;
};

export const getUserConnections = async ({
  username,
  page = 1,
  type = "followers",
}: GetUserConnectionsVariables): Promise<User[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HASHNODE_REST_API_URL}/profile/${username}/${type}?page=${page}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data?.[type];
};

export const toggleFollowUser = async (
  username: string
): Promise<{ user: { username: string } }> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: TOGGLE_FOLLOW_USER,
      variables: { username },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.toggleFollowUser;
};
