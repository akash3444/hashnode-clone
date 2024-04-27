"use client";

import Button from "@/shared/Button";
import React from "react";
import { LinkIcon } from "../icons";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import toast from "react-hot-toast";

const CopyLink = ({ className }: { className?: string }) => {
  const [_, copy] = useCopyToClipboard();

  const copyLink = async () => {
    const copied = await copy(window.location.href);
    if (copied) toast.success("Link copied!");
    else toast.error("Could not copy link!");
  };

  return (
    <Button
      isIconOnly
      size="sm"
      variant="bordered"
      onClick={copyLink}
      className={className}
    >
      <LinkIcon className="h-4 w-4" />
    </Button>
  );
};

export default CopyLink;
