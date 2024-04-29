"use client";

import { LoginModal } from "@/components/Login";
import { ReactNode, createContext, use, useState } from "react";

const ModalContext = createContext<{
  modal?: string;
  openModal: (modal: string) => void;
  closeModal: () => void;
}>({ openModal: () => {}, closeModal: () => {} });

const ModalRenderer = ({ modal }: { modal: string | undefined }) => {
  switch (modal) {
    case "login":
      return <LoginModal />;

    default:
      return null;
  }
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<string>();

  const openModal = (modal: string) => setModal(modal);
  const closeModal = () => {
    setModal("");
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      <ModalRenderer modal={modal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => use(ModalContext);

export default ModalProvider;
