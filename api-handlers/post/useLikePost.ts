import { useMutation } from "@tanstack/react-query";
import { likePost } from "../post";

const useLikePost = () => {
  return useMutation({
    mutationFn: likePost,
  });
};

export default useLikePost;
