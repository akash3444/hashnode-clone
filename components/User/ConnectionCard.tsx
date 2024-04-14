import { User } from "@/lib/types";
import Card, { CardBody } from "@/shared/Card";
import Typography from "@/shared/Typography";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { PlusIcon } from "../icons";

interface ConnectionCardProps extends User {}

const ConnectionCard: FC<ConnectionCardProps> = ({
  name,
  photo,
  tagline,
  username,
}) => {
  return (
    <Card className="bg-slate-100 border-0">
      <CardBody className="flex-row items-start gap-2 p-1 max-w-full">
        <div className="relative h-9 w-9 shrink-0 bg-slate-200 rounded-full">
          <Image src={photo} alt={name} fill className="rounded-full" />
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
        <button className="ml-auto shrink-0 h-[26px] w-[26px] flex items-center justify-center rounded-full bg-white border hover:bg-slate-200">
          <PlusIcon className="h-4 w-4 text-primary-600" />
        </button>
      </CardBody>
    </Card>
  );
};

export default ConnectionCard;
