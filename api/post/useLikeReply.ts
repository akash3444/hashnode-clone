import { useMutation } from "@tanstack/react-query";
import { likeReply } from "../post";

const useLikeReply = () => {
  return useMutation({
    mutationFn: likeReply,
  });
};

export default useLikeReply;
