"use client";

import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { FC, useState } from "react";
import { HeartsIcon } from "../icons";
import { PeopleWhoLiked } from "./PeopleWhoLiked";

interface ReactionsProps {
  likedBy: Article["likedBy"];
}

const MAX_AVATAR = 4;

export const Reactions: FC<ReactionsProps> = ({ likedBy }) => {
  const [showPeopleWhoLiked, setShowPeopleWhoLiked] = useState(false);

  return (
    <>
      {!!likedBy.edges?.length && (
        <Tooltip
          content={`${likedBy.totalDocuments} people liked this article`}
        >
          <Button variant="flat" onClick={() => setShowPeopleWhoLiked(true)}>
            <HeartsIcon className="h-6 w-6" />
            <AvatarGroup
              max={MAX_AVATAR}
              total={likedBy.totalDocuments - MAX_AVATAR}
              size="sm"
              renderCount={(count) => (
                <Avatar
                  name={`+${count}`}
                  classNames={{
                    base: "border-2 border-white bg-white data-[hover=true]:-translate-x-0",
                  }}
                />
              )}
            >
              {likedBy.edges.map(({ node: { id, profilePicture } }) => (
                <Avatar
                  key={id}
                  src={profilePicture}
                  classNames={{
                    base: "border-2 border-white data-[hover=true]:-translate-x-0",
                  }}
                />
              ))}
            </AvatarGroup>
          </Button>
        </Tooltip>
      )}
      {showPeopleWhoLiked && (
        <PeopleWhoLiked onClose={() => setShowPeopleWhoLiked(false)} />
      )}
    </>
  );
};
