import { useEffect } from "react";

export const useLockBodyScroll = (locked = false) => {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = "15px";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    };
  }, [locked]);
};
