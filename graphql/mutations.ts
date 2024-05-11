export const SUBSCRIBE_TO_NEWSLETTER = `
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
      __typename
    }
  }
`;

export const TOGGLE_FOLLOW_USER = `
  mutation ToggleFollowUser($username: String) {
    toggleFollowUser(username: $username) {
      user {
        username
      }
    }
  }
`;

export const LIKE_POST = `
  mutation LikePost($input: LikePostInput!) {
    likePost(input: $input) {
      post {
        id
      }
    }
  }
`;

export const LIKE_COMMENT = `
  mutation LikeComment($input: LikeCommentInput!) {
    likeComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export const LIKE_REPLY = `
  mutation LikeReply($input: LikeReplyInput!) {
    likeReply(input: $input) {
      reply {
        id
      }
    }
  }
`;

export const ADD_COMMENT = `
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        myTotalReactions
        author {
          id
          name
          username
          profilePicture
        }
        content {
          html
        }
        totalReactions
        dateAdded
      }
    }
  }
`;
