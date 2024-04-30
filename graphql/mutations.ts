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
