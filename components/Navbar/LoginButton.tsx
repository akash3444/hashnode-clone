"use client";

import { useModal } from "@/contexts/ModalContext";
import Button from "@/shared/Button";
import React from "react";

export const LoginButton = () => {
  const { openModal } = useModal();

  return (
    <Button color="primary" onClick={() => openModal("login")}>
      Login
    </Button>
  );
};
