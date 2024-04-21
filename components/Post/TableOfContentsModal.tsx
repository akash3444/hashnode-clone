import { TableOfContent } from "@/lib/types";
import Button from "@/shared/Button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { CloseIcon } from "../icons";
import { TableOfContents } from "./TableOfContents";

export const TableOfContentsModal = ({
  onClose,
  tableOfContents,
}: {
  onClose: () => void;
  tableOfContents: TableOfContent[];
}) => {
  return (
    <Modal isOpen onClose={onClose} hideCloseButton size="2xl">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-1 text-xl">
          Table of contents
          <Button isIconOnly variant="light" size="sm" onClick={onClose}>
            <CloseIcon />
          </Button>
        </ModalHeader>
        <ModalBody className="pt-0 pb-4">
          <TableOfContents
            tableOfContents={tableOfContents}
            highlightActiveItem
            onItemClick={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
