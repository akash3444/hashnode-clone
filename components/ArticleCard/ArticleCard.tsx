import {
  BookmarkIcon,
  BookmarkSolidIcon,
  ChatBubble,
  FeaturedIcon,
} from "@/components/icons";
import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import Card from "@/shared/Card";
import Tooltip from "@/shared/Tooltip";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import { CardBody, CardFooter, CardHeader, CardProps } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import UserInfo from "../UserInfo";

interface ArticleCardProps extends CardProps {
  article: Article;
}

const ArticleCardHeader: FC<Article> = ({
  author,
  dateAdded,
  url,
  isFeatured,
}) => (
  <CardHeader className="flex items-center justify-between">
    <UserInfo author={author} dateAdded={dateAdded} url={url} showProBadge />
    {isFeatured && (
      <Chip
        color="secondary"
        variant="flat"
        className="px-2"
        classNames={{ content: "font-semibold" }}
        startContent={<FeaturedIcon />}
      >
        Featured
      </Chip>
    )}
  </CardHeader>
);

const ArticleCardBody: FC<Article> = ({ brief, coverImage, title, slug }) => (
  <CardBody
    className="flex flex-row gap-4 justify-between"
    as={NextLink}
    href={slug}
  >
    <div>
      <h2 className="text-xl font-extrabold mb-2">{title}</h2>
      <p className="text-sm line-clamp-3">{brief}</p>
    </div>
    {!!coverImage && (
      <div className="relative h-full min-w-48 aspect-video">
        <Image src={coverImage.url} fill alt={title} className="rounded-lg" />
      </div>
    )}
  </CardBody>
);

const ArticleCardFooter: FC<Article> = ({
  bookmarked,
  tags,
  totalReactions,
  views,
}) => (
  <CardFooter className="flex items-center justify-between">
    <WithSeparatorDot>
      <Link
        color="foreground"
        size="sm"
        className="font-medium leading-none"
        href="/"
      >
        <ChatBubble className="h-4 mr-2" />
        Discuss
      </Link>
      {!!totalReactions && (
        <span className="text-sm">
          {totalReactions} {totalReactions === 1 ? "like" : "likes"}
        </span>
      )}
      {!!views && (
        <span className="text-sm">
          {views} {views === 1 ? "read" : "reads"}
        </span>
      )}
    </WithSeparatorDot>
    <div className="flex items-center gap-2">
      {!!tags?.length && (
        <>
          <Chip size="sm" variant="flat">
            {tags[0]?.name}
          </Chip>
          <Divider orientation="vertical" className="h-3.5 ml-1 mr-0" />
        </>
      )}
      <Tooltip content={bookmarked ? "Remove bookmark" : "Save for later"}>
        <Button isIconOnly size="sm" variant="light">
          {bookmarked ? (
            <BookmarkSolidIcon className="text-foreground-500" />
          ) : (
            <BookmarkIcon className="text-foreground-500" />
          )}
        </Button>
      </Tooltip>
    </div>
  </CardFooter>
);

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  return (
    <Card>
      <ArticleCardHeader {...article} />
      <ArticleCardBody {...article} />
      <ArticleCardFooter {...article} />
    </Card>
  );
};

export default ArticleCard;
