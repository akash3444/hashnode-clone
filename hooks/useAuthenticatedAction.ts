import { useModal } from "@/contexts/ModalContext";
import { useSession } from "next-auth/react";

const useAuthenticatedAction = () => {
  const session = useSession();
  const { openModal } = useModal();

  return function (action: () => void) {
    if (session?.data?.user) action();
    else openModal("login");
  };
};

export default useAuthenticatedAction;
