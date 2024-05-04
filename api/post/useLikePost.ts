import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { likePost } from "../post";

const useLikePost = () => {
  const session = useSession();

  return useMutation({
    mutationFn: async (input: { postId: string; likesCount: number }) =>
      likePost(input, session?.data?.user?.accessToken || ""),
  });
};

export default useLikePost;
