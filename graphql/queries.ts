export const GET_FEED = `
  query Feed(
    $first: Int!
    $filter: FeedFilter
    $after: String
    $commentsFirst: Int! = 0
  ) {
    feed(first: $first, filter: $filter, after: $after) {
      edges {
        node {
          ...RequiredPostFields
          author {
            ...RequiredUserFields
            __typename
          }
          series {
            ...RequiredSeriesFields
            __typename
          }
          tags {
            ...RequiredTagFields
            __typename
          }
          publication {
            ...RequiredPublicationFields
            __typename
          }
          comments(first: $commentsFirst, sortBy: TOP) {
            ...RequiredCommentConnection
            __typename
          }
          __typename
        }
        __typename
      }
      pageInfo {
        hasNextPage
        endCursor
        __typename
      }
      __typename
    }
  }
  fragment RequiredPostFields on Post {
    id
    _id: id
    coverImage {
      isPortrait
      url
      __typename
    }
    slug
    readTime: readTimeInMinutes
    replyCount
    responseCount
    brief
    subtitle
    isFeatured: featured
    contributors {
      _id: id
      name
      photo: profilePicture
      username
      __typename
    }
    bookmarked
    views
    url
    totalReactions: reactionCount
    title
    dateAdded: publishedAt
    url
    cuid
    preferences {
      disableComments
      __typename
    }
    __typename
  }
  fragment RequiredUserFields on User {
    _id: id
    name
    photo: profilePicture
    isPro
    username
    __typename
  }
  fragment RequiredSeriesFields on Series {
    _id: id
    slug
    name
    cuid
    __typename
  }
  fragment RequiredTagFields on Tag {
    _id: id
    logo
    name
    slug
    __typename
  }
  fragment RequiredPublicationFields on Publication {
    _id: id
    url
    canonicalURL
    title
    displayTitle
    isHeadless
    favicon
    headerColor
    metaTags
    isTeam
    domainInfo {
      hashnodeSubdomain
      domain {
        host
        ready
        __typename
      }
      __typename
    }
    urlPattern
    __typename
  }
  fragment RequiredCommentConnection on PostCommentConnection {
    edges {
      node {
        ...RequiredCommentFields
        __typename
      }
      __typename
    }
    pageInfo {
      hasNextPage
      endCursor
      __typename
    }
    __typename
  }
  fragment RequiredCommentFields on Comment {
    id
    author {
      _id: id
      name
      photo: profilePicture
      isPro
      username
      __typename
    }
    content {
      html
      markdown
      text
      __typename
    }
    dateAdded
    stamp
    totalReactions
    __typename
  }
`;

export const GET_DISCUSSIONS_TOP_COMMENTERS = `
  query DiscussionsTopCommenters {
    topCommenters(first: 5) {
      edges {
        node {
          ...RequiredTopCommenterFields
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment RequiredTopCommenterFields on User {
    _id: id
    name
    photo: profilePicture
    isPro
    username
    __typename
  }
`;
