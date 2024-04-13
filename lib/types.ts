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
  series: Series;
  bookmarked: boolean;
  views: number;
  url: string;
  totalReactions: number;
  dateAdded: string;
  preferences: { disableComments: boolean };
  tags: Tag[];
}

export interface Series {
  _id: string;
  slug: string;
  name: string;
}

export interface Author {
  _id: string;
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

export interface Changelog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  contentMarkdown: string;
  coverImageURL: string;
  author: string;
  type: string;
  isActive: boolean;
  dateAdded: string;
}

export interface Challenge {
  _id: string;
  badges: string[];
  isActive: boolean;
  title: string;
  contentMarkdown: string;
  image: string;
  slug: string;
  descriptionMarkdown: string;
  tagline: string;
  url: string;
  ctaLabel: string;
  ctaURL: string;
  coverImage: string;
  ogImage: string;
  dateAdded: string;
  content: string;
  description: string;
}

export interface UserProfile {
  _id: string;
  numFollowers: number;
  numFollowing: number;
  isAmbassador: boolean;
  hasGoldRing: boolean;
  name: string;
  username: string;
  tagline: string;
  photo: string; // URL string
  blogHandle: string;
  publicationDomain: string | null;
  publicationEnabled: boolean;
  // latestPost: LatestPost;
  // domainStatus: DomainStatus;
}
