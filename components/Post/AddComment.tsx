"use client";

import Button from "@/shared/Button";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { SuggestionDataItem } from "react-mentions";
import { ArrowUpRightIcon } from "../icons";
import CommentInput from "./CommentInput";

export const AddComment = ({
  onAdd,
  isAdding,
  usersInConversation,
}: {
  isAdding?: boolean;
  onAdd: (content: string, onSuccess: () => void) => void;
  usersInConversation: SuggestionDataItem[];
}) => {
  const [value, setValue] = useState("");

  return (
    <div className="pt-6 px-6 flex flex-col gap-2">
      <CommentInput
        users={usersInConversation}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <Link
          color="foreground"
          className="gap-2 text-xs"
          href="https://hashnode.com/code-of-conduct"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
          Code of conduct
        </Link>
        <Button
          isDisabled={isAdding}
          className="ml-auto"
          size="sm"
          color="primary"
          onClick={() => {
            if (value) onAdd(value, () => setValue(""));
          }}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};
