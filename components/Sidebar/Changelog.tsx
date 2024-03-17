"use client";

import { SEPARATOR_DOT } from "@/lib/constants";
import type { Changelog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Button from "@/shared/Button";
import Card from "@/shared/Card";
import { CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Image from "next/image";
import { FC, useState } from "react";
import { CloseIcon } from "../icons";

interface ChangelogProps {
  changelog: Changelog;
}

const Changelog: FC<ChangelogProps> = ({
  changelog: { title, coverImageURL, dateAdded, type },
}) => {
  const [showChangelog, setShowChangelog] = useState(true);

  if (!showChangelog) return null;

  return (
    <Card>
      <CardHeader className="pt-2 justify-between">
        <h2 className="text-xl font-bold">Changelog</h2>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-foreground-500"
          onClick={() => setShowChangelog(false)}
        >
          <CloseIcon />
        </Button>
      </CardHeader>
      <CardBody className="pt-1">
        <div className="relative aspect-video">
          <Image src={coverImageURL} alt={title} fill className="rounded-lg" />
        </div>
        <h3 className="mt-3 mb-2 text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-3">
          <span>{formatDate(dateAdded)}</span>
          <span className="text-foreground-400">{SEPARATOR_DOT}</span>
          {!!type && (
            <Chip
              className="capitalize"
              size="sm"
              color="success"
              variant="flat"
            >
              {type}
            </Chip>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Changelog;
