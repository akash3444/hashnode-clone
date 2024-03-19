"use client";

import type { Changelog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Button from "@/shared/Button";
import Card from "@/shared/Card";
import Typography from "@/shared/Typography";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
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
        <Typography variant="h2">Changelog</Typography>
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
        <Typography variant="h3" className="mt-3 mb-2">
          {title}
        </Typography>
        <WithSeparatorDot className="gap-3">
          <span>{formatDate(dateAdded)}</span>
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
        </WithSeparatorDot>
      </CardBody>
    </Card>
  );
};

export default Changelog;
