"use server";

import { Article, Changelog } from "@/lib/types";

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
  console.log("data :", duration, data.posts?.[0].title);

  return data;
};
