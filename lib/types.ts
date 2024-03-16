export interface Article {
  id: string;
  title: string;
  author: Author;
  coverImage: CoverImage;
  slug: string;
  readTime: number;
  replyCount: number;
  responseCount: number;
  brief: string;
  subtitle: string;
  isFeatured: boolean;
  // "contributors": [],
  bookmarked: boolean;
  views: number;
  url: string;
  totalReactions: number;
  dateAdded: string;
  preferences: { disableComments: boolean };
  tags: Tag[];
}

export interface Author {
  id: string;
  name: string;
  isPro: boolean;
  photo: string;
  username: string;
}

export interface CoverImage {
  isPortrait: boolean;
  url: string;
}

export interface Tag {
  _id: string;
  logo: string;
  name: string;
  slug: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  __typename: "PageInfo";
}

export interface Publication {
  _id: string;
  url: string;
  canonicalURL: string;
  title: string;
  displayTitle: string;
  isHeadless: boolean;
  // favicon: null;
  headerColor: string;
  // metaTags: null;
  isTeam: boolean;
  domainInfo: {
    hashnodeSubdomain: string;
    // domain: null;
  };
  urlPattern: UrlPattern;
}

type UrlPattern = "DEFAULT" | "SIMPLE";
export type FeedType = "RECENT" | "PERSONALIZED" | "FEATURED" | "RELEVANT";
