"use client";

import useAuthenticatedAction from "@/hooks/useAuthenticatedAction";

export const ReplyButton = () => {
  const authenticatedAction = useAuthenticatedAction();

  const reply = () => {};

  return (
    <button
      className="hover:underline text-sm font-medium"
      onClick={() => authenticatedAction(reply)}
    >
      Reply
    </button>
  );
};
