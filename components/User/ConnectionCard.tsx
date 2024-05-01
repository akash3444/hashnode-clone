import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { User } from "@/lib/types";
import Card, { CardBody } from "@/shared/Card";
import Typography from "@/shared/Typography";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ConnectionFollowButton } from "./ConnectionFollowButton";

interface ConnectionCardProps extends User {}

const ConnectionCard: FC<ConnectionCardProps> = ({
  _id,
  name,
  photo,
  tagline,
  username,
}) => {
  return (
    <Card className="bg-slate-100 dark:bg-foreground-900 border-0">
      <CardBody className="flex-row items-start gap-2 p-1 max-w-full">
        <div className="relative h-9 w-9 shrink-0 bg-slate-200 rounded-full">
          <Image
            src={photo || DEFAULT_PROFILE_PICTURE}
            alt={name}
            fill
            className="rounded-full"
          />
        </div>
        <div>
          <Link
            href={`/users/${username}`}
            className="text-ellipsis line-clamp-1 inline-block"
          >
            <Typography variant="h5">{name}</Typography>
          </Link>
          <p className="line-clamp-1 text-ellipsis text-sm text-foreground-600">
            {tagline}
          </p>
        </div>
        <ConnectionFollowButton userId={_id} />
      </CardBody>
    </Card>
  );
};

export default ConnectionCard;
