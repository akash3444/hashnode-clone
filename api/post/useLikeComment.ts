import { useMutation } from "@tanstack/react-query";
import { likeComment } from "../post";

const useLikeComment = () => {
  return useMutation({
    mutationFn: likeComment,
  });
};

export default useLikeComment;
