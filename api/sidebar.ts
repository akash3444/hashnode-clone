"use server";

import { Article, Challenge, Changelog } from "@/lib/types";

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_REST_API_URL;

export const getLatestChangelog = async (): Promise<Changelog> => {
  const res = await fetch(`${endpoint}/widget/latest-changelog`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
};

export const getTrendingArticles = async (
  duration: string = "7"
): Promise<{ posts: Article[] }> => {
  const res = await fetch(
    `${endpoint}/post/get-top-posts?duration=${duration}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data;
};

export const getWritingChallenges = async (): Promise<Challenge[]> => {
  const res = await fetch(`${endpoint}/widget/challenges`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
};
