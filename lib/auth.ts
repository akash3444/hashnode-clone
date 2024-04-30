import { getAuthenticatedUser } from "@/api/auth";
import { SessionUser } from "@/types/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        accessToken: {},
      },
      authorize: async (credentials) => {
        let user;
        const { accessToken } = credentials || {};

        // verify if user with provided access token exists
        user = await getAuthenticatedUser(accessToken as string);
        return user ? { ...user, accessToken } : user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      const user = token.user as SessionUser;
      session.user = { ...session.user, ...user };
      return session;
    },
  },
});

export const getAccessToken = async () => {
  const session = await auth();

  return session?.user?.accessToken;
};
