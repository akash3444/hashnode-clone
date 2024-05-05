declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL: string;
      NEXT_PUBLIC_HASHNODE_REST_API_URL: string;
      AUTH_SECRET: string;
      DEMO_ACCOUNT_ACCESS_TOKEN: string;
      NODE_ENV: "development" | "production";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
