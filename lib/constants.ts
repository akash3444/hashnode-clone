import { PostCommentSortBy } from "./types";

export const SEPARATOR_DOT = "·";

// Defaults
export const DEFAULT_PROFILE_PICTURE =
  "https://cdn.hashnode.com/res/hashnode/image/upload/v1707121372242/57c3ede2-19a1-4530-beec-fae5db66c6a2.png";
export const DEFAULT_TAG_LOGO =
  "https://cdn.hashnode.com/res/hashnode/image/upload/v1690883253640/dce6d784-5d60-483d-9292-afa1f701fbd0.png?w=200&h=200&fit=crop&crop=entropy&auto=compress,format&format=webp";

export const POST_COMMENTS_SORT_BY: Record<
  PostCommentSortBy,
  PostCommentSortBy
> = {
  TOP: "TOP",
  RECENT: "RECENT",
};

export const emailPattern =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
