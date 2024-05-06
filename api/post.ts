"use server";

import {
  LIKE_COMMENT,
  LIKE_POST,
  LIKE_REPLY,
  SUBSCRIBE_TO_NEWSLETTER,
} from "@/graphql/mutations";
import { GET_POST, GET_POST_COMMENTS, GET_POST_LIKES } from "@/graphql/queries";
import { getAccessToken } from "@/lib/auth";
import {
  Article,
  NewsletterSubscribeStatus,
  PostCommentSortBy,
} from "@/lib/types";
import { getGraphQlEndpoint } from "@/lib/utils";

export const getPost = async (variables: {
  authenticatedUserIds?: string[];
  postId: string;
}): Promise<Article> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_POST,
      variables,
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
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
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

export const bookmarkArticle = async (postId: string) => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(
    "https://hashnode.com/ajax/collections/add-or-remove-post",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        postId,
        responseId: null,
        bookmarkType: "SAVED",
      }),
    }
  );
  const data = await res.json();

  return data?.bookmark;
};

export const likePost = async (input: {
  postId: string;
  likesCount: number;
}): Promise<{ post: { id: string } }> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: LIKE_POST,
      variables: { input },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.likePost;
};

export const likeComment = async (input: {
  commentId: string;
  likesCount: number;
}): Promise<{ comment: { id: string } }> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: LIKE_COMMENT,
      variables: { input },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.likeComment;
};

export const likeReply = async (input: {
  commentId: string;
  replyId: string;
  likesCount: number;
}): Promise<{ reply: { id: string } }> => {
  const accessToken = (await getAccessToken()) || "";
  const res = await fetch(getGraphQlEndpoint(), {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: LIKE_REPLY,
      variables: { input },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.likeReply;
};
