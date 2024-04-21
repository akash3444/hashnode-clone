"use server";

import { GET_POST, GET_POST_COMMENTS, GET_POST_LIKES } from "@/graphql/queries";
import { Article, PostCommentSortBy } from "@/lib/types";

export const getPost = async (postId: string): Promise<Article> => {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_POST,
      variables: { postId },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.post;
};

export const getPostLikes = async (variables: {
  postId: string;
  first: number;
  after?: string;
}): Promise<Article> => {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_POST_LIKES,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.post;
};

export const getPostComments = async (variables: {
  postId: string;
  first: number;
  after?: string;
  sortBy: PostCommentSortBy;
}): Promise<Article["comments"]> => {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: GET_POST_COMMENTS,
      variables,
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.post?.comments;
};
