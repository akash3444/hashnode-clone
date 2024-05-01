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

export const GET_TAG = `
  query Tag($slug: String!) {
    tag(slug: $slug) {
      id
      name
      slug
      logo
      followersCount
      postsCount
    }
  }
`;

export const GET_TAG_FEED = `
  query TagsFeed(
    $slug: String!
    $first: Int!
    $filter: TagPostConnectionFilter!
    $after: String
  ) {
    tag(slug: $slug) {
      id
      feed: posts(first: $first, filter: $filter, after: $after) {
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
            comments(first: 1, sortBy: TOP) {
              ...RequiredCommentConnection
              __typename
            }
            __typename
          }
          __typename
        }
        pageInfo {
          endCursor
          hasNextPage
          __typename
        }
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

export const GET_USER = `
  query User($username: String!) {
    user(username: $username) {
      id
      name
      isPro
      bio {
        text
      }
      following
      followersCount
      location
      socialMediaLinks {
        website
        github
        twitter
        instagram
        facebook
        stackoverflow
        linkedin
        youtube
      }
      dateJoined
      availableFor
      profilePicture
      tagline
      badges {
        id
        name
        image
        dateAssigned
      }
    }
  }
`;

export const GET_USER_INFO = `
  query User($username: String!) {
    user(username: $username) {
      id
      name
      tagline
      following
      profilePicture
      location
      dateJoined
      followersCount
      followingsCount
    }
  }
`;

export const GET_POST = `
  query Post($postId: ID!) {
    post(id: $postId) {
      title
      slug
      publication {
        id
        url
      }
      author {
        id
        name
        bio {
          text
        }
        username
        profilePicture
      }
      coverImage {
        url
      }
      reactionCount
      responseCount
      tags {
        name
        slug
      }
      content {
        html
      }
      features {
        tableOfContents {
          isEnabled
          items {
            id
            level
            slug
            title
            parentId
          }
        }
      }
      featured
      featuredAt
      readTimeInMinutes
      reactionCount
      replyCount
      likedBy(first: 4) {
        edges {
          node {
            id
            profilePicture
          }
        }
        totalDocuments
      }
      seo {
        title
        description
      }
    }
  }
`;

export const GET_POST_LIKES = `
  query Post($postId: ID!, $first: Int!, $after: String) {
    post(id: $postId) {
      likedBy(first: $first, after: $after) {
        edges {
          node {
            id
            profilePicture
            name
            username
          }
          reactionCount
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_POST_COMMENTS = `
  query Post($postId: ID!, $first: Int!, $sortBy: PostCommentSortBy) {
    post(id: $postId) {
      comments(first: $first, sortBy: $sortBy) {
        edges {
          node {
            id
            author {
              id
              name
              username
              profilePicture
            }
            content {
              text
            }
            totalReactions
            dateAdded
            replies(first: $first) {
              edges {
                node {
                  id
                  author {
                    id
                    name
                    username
                    profilePicture
                  }
                  content {
                    text
                  }
                  totalReactions
                  dateAdded
                }
              }
              totalDocuments
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_AUTHENTICATED_USER = `
  query GetAuthenticatedUser {
    me {
      id
      name
      username
      profilePicture
      publications(first: 1) {
        edges {
          node {
            id
            url
          }
        }
      }
    }
  }
`;
