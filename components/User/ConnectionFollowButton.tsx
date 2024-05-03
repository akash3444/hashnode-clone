"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";
import { useSession } from "next-auth/react";
import { PlusIcon } from "../icons";

export const ConnectionFollowButton = ({ userId }: { userId: string }) => {
  const session = useSession();
  const authenticatedAction = useAuthenticatedAction();

  const toggleFollow = () => {};

  if (
    session.status === "authenticated" &&
    session?.data?.user?.id === userId
  ) {
    return null;
  }

  return (
    <button
      className="ml-auto shrink-0 h-[26px] w-[26px] flex items-center justify-center rounded-full bg-white border hover:bg-slate-200 dark:bg-foreground-950 dark:border-foreground-700"
      onClick={() => authenticatedAction(toggleFollow)}
    >
      <PlusIcon className="h-4 w-4 text-primary-600" />
    </button>
  );
};
