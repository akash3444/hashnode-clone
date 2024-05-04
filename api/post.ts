"use server";

import { SUBSCRIBE_TO_NEWSLETTER } from "@/graphql/mutations";
import { GET_POST, GET_POST_COMMENTS, GET_POST_LIKES } from "@/graphql/queries";
import {
  Article,
  NewsletterSubscribeStatus,
  PostCommentSortBy,
} from "@/lib/types";
import { getGraphQlEndpoint } from "@/lib/utils";

export const getPost = async (postId: string): Promise<Article> => {
  const res = await fetch(getGraphQlEndpoint(), {
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
  const res = await fetch(getGraphQlEndpoint(), {
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
  const res = await fetch(getGraphQlEndpoint(), {
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

export const subscribeToNewsletter = async (input: {
  email: string;
  publicationId: string;
}): Promise<{ status: NewsletterSubscribeStatus }> => {
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: SUBSCRIBE_TO_NEWSLETTER,
      variables: { input },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.subscribeToNewsletter;
};
