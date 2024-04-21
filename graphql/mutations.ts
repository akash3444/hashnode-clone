export const SUBSCRIBE_TO_NEWSLETTER = `
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
      __typename
    }
  }
`;
