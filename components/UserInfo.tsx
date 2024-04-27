import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn, formatDate, getDomain } from "@/lib/utils";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";
import { UserProfileSummary } from "./UserProfileSummary";
import Link from "next/link";

interface UserInfoProps extends Partial<Article> {
  showProBadge?: boolean;
  size?: "sm" | "md";
}

const UserInfo: FC<UserInfoProps> = ({
  author,
  url,
  dateAdded,
  showProBadge,
  publication,
  size = "md",
}) => {
  const isSmall = size === "sm";

  return (
    <div className="flex items-center gap-3">
      {author && (
        <Tooltip
          disableAnimation
          content={<UserProfileSummary userId={author._id} />}
          placement="bottom"
          delay={500}
        >
          <Link
            href={`/users/${author.username}`}
            className={cn(
              "relative h-10 w-10 cursor-pointer hover:opacity-75",
              {
                "h-8 w-8": isSmall,
              }
            )}
          >
            <Image
              alt={author.name}
              src={author.photo || DEFAULT_PROFILE_PICTURE}
              fill
              className="rounded-full object-cover object-center flex-shrink-0 flex-grow shadow-small"
            />
          </Link>
        </Tooltip>
      )}
      <div className="flex flex-col">
        {author && (
          <div className="flex items-center">
            <Link
              href={`/users/${author.username}`}
              className={cn("text-base font-semibold mr-1.5", {
                "text-sm": isSmall,
              })}
            >
              {author.name}
            </Link>
            {showProBadge && author.isPro && <Chip size="sm">Pro</Chip>}
          </div>
        )}
        <WithSeparatorDot className="hidden md:flex text-sm text-default-500">
          {url && publication?.url && (
            <Link href={publication?.url} target="_blank">
              {getDomain(url)}
            </Link>
          )}
          {dateAdded && <span>{formatDate(dateAdded)}</span>}
        </WithSeparatorDot>
        {dateAdded && (
          <span className="md:hidden text-sm text-default-500">
            {formatDate(dateAdded)}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
