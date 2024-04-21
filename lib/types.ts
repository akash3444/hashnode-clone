export interface Article {
  id: string;
  title: string;
  author: User;
  coverImage: CoverImage;
  content: {
    html: string;
  };
  slug: string;
  readTime: number;
  replyCount: number;
  responseCount: number;
  readTimeInMinutes: number;
  brief: string;
  subtitle: string;
  isFeatured: boolean;
  featured: boolean;
  series: Series;
  publication: Publication;
  bookmarked: boolean;
  views: number;
  url: string;
  totalReactions: number;
  reactionCount: number;
  dateAdded: string;
  featuredAt: string;
  preferences: { disableComments: boolean };
  tags: Tag[];
  likedBy: {
    edges: {
      node: User;
      reactionCount: number;
    }[];
    pageInfo: PageInfo;
    totalDocuments: number;
  };
  comments: {
    edges: {
      node: Comment;
    }[];
    pageInfo: PageInfo;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface Comment {
  id: string;
  author: User;
  content: {
    text: string;
    html: string;
    markdown: string;
  };
  totalReactions: number;
  dateAdded: string;
  replies?: {
    edges: {
      node: Comment;
    }[];
    pageInfo: PageInfo;
    totalDocuments: number;
  };
}

export interface Series {
  _id: string;
  slug: string;
  name: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  isPro: boolean;
  photo: string;
  username: string;
  bio: {
    text: string;
    html: string;
    markdown: string;
  };
  followersCount: number;
  followingsCount: number;
  location: string;
  socialMediaLinks: {
    website: string;
    github: string;
    twitter: string;
    instagram: string;
    facebook: string;
    stackoverflow: string;
    linkedin: string;
    youtube: string;
  };
  dateJoined: string;
  availableFor: string;
  profilePicture: string;
  tagline: string;
  badges: Badge[];
  followers: { nodes: User[]; pageInfo: PageInfo };
}

export interface Badge {
  id: string;
  name: string;
  image: string;
  dateAssigned: string;
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
  followersCount: number;
  postsCount: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  __typename: "PageInfo";
}

export interface Publication {
  _id: string;
  id: string;
  url: string;
  canonicalURL: string;
  title: string;
  domain: string;
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

export type ConnectionType = "following" | "followers";

export type PostCommentSortBy = "TOP" | "RECENT";

export type NewsletterSubscribeStatus = "PENDING" | "CONFIRMED";
