"use client";

import { authenticate } from "@/api-handlers/auth";
import { useModal } from "@/contexts/ModalContext";
import Button from "@/shared/Button";
import Typography from "@/shared/Typography";
import {
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { CloseIcon } from "../icons";
import LoginWithDemoAccount from "./LoginWithDemoAccount";

export const LoginModal = () => {
  const [error, formAction] = useFormState(authenticate, undefined);
  const { closeModal, modal } = useModal();

  return (
    <Modal
      isOpen={modal === "login"}
      hideCloseButton
      size="sm"
      classNames={{
        backdrop: "dark:bg-foreground-500/15",
      }}
      onClose={closeModal}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-1 text-xl">
          Login
          <Button isIconOnly variant="light" size="sm" onClick={closeModal}>
            <CloseIcon />
          </Button>
        </ModalHeader>
        <ModalBody className="py-6">
          <form action={formAction} noValidate>
            <Input
              name="accessToken"
              label="Access Token"
              labelPlacement="outside"
              placeholder="Enter your access token"
              errorMessage={error}
              isInvalid={!!error}
            />
            <Typography className="mt-1.5 mb-2 text-xs text-foreground-500">
              Don&apos;t have an access token? Get the access token from{" "}
              <Link
                href="https://hashnode.com/settings/developer"
                target="_blank"
                size="sm"
                className="text-xs"
              >
                Hashnode developer settings.
              </Link>
            </Typography>
            <LoginButton />
          </form>
          <LoginWithDemoAccount />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="primary"
      className="mt-4"
      type="submit"
      isDisabled={pending}
      fullWidth
    >
      Login
    </Button>
  );
};
