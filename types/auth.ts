import { User } from "@/lib/types";

export type SessionUser = Pick<
  User,
  "id" | "name" | "username" | "profilePicture" | "publications"
>;
