import { useMutation } from "@tanstack/react-query";
import { toggleFollowUser } from "../user";

const useFollowUser = () =>
  useMutation({
    mutationFn: toggleFollowUser,
  });

export default useFollowUser;
