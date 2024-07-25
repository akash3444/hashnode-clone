"use server";

import { TOGGLE_FOLLOW_USER } from "@/graphql/mutations";
import { GET_USER, GET_USER_INFO } from "@/graphql/queries";
import { getAccessToken } from "@/lib/auth";
import { Activity, ConnectionType, User } from "@/lib/types";
import { getGraphQlEndpoint } from "@/lib/utils";

interface GetUserConnectionsVariables {
  username: string;
  page: number;
  type: ConnectionType;
}

export type ActivitiesGroupedByDate = [
  {
    activities: Activity[];
    date: string;
  }
];

export const getUser = async (username: string): Promise<User> => {
  const accessToken = (await getAccessToken()) || "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };
  const res = await fetch(getGraphQlEndpoint(), {
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
  const res = await fetch(getGraphQlEndpoint(), {
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
  const res = await fetch(getGraphQlEndpoint(), {
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

export const getUserRecentActivity = async ({
  username,
  page = 0,
}: {
  username: string;
  page: number;
}): Promise<{
  activitiesGroupedByDate: ActivitiesGroupedByDate;
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HASHNODE_REST_API_URL}/profile/${username}/recent-activity?page=${page}`,
    {
      cache: "no-store",
    }
  );

  return await res.json();
};
