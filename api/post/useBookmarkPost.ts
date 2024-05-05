import { useMutation } from "@tanstack/react-query";
import { bookmarkArticle } from "../post";

const useBookmarkPost = () => {
  return useMutation({
    mutationFn: bookmarkArticle,
  });
};

export default useBookmarkPost;
