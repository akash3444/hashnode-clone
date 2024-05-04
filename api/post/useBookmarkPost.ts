import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { bookmarkArticle } from "../post";

const useBookmarkPost = () => {
  const session = useSession();

  return useMutation({
    mutationFn: async (postId: string) =>
      bookmarkArticle(postId, session?.data?.user?.accessToken || ""),
  });
};

export default useBookmarkPost;
