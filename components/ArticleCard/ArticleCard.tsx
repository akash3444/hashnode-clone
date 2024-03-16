import {
  BookmarkIcon,
  BookmarkSolidIcon,
  ChatBubble,
  FeaturedIcon,
} from "@/components/icons";
import { DEFAULT_PROFILE_PICTURE, SEPARATOR_DOT } from "@/lib/constants";
import { Article } from "@/lib/types";
import { cn, getDomain } from "@/lib/utils";
import Button from "@/shared/Button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { format } from "date-fns/format";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";

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
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <Image
          alt={author.name}
          src={author.photo || DEFAULT_PROFILE_PICTURE}
          fill
          className="rounded-full object-cover object-center flex-shrink-0 flex-grow shadow-small"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="text-base font-semibold mr-1.5">{author.name}</p>
          {author.isPro && <Chip size="sm">Pro</Chip>}
        </div>
        <p className="text-small text-default-500">
          {getDomain(url)} {SEPARATOR_DOT} {format(dateAdded, "MMM dd, yyyy")}
        </p>
      </div>
    </div>
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
      <h2 className="text-xl font-bold mb-2">{title}</h2>
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
    <div className="flex items-center gap-2">
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
        <>
          {SEPARATOR_DOT}
          <span className="text-sm">
            {totalReactions} {totalReactions === 1 ? "like" : "likes"}
          </span>
        </>
      )}
      {!!views && (
        <>
          {SEPARATOR_DOT}
          <span className="text-sm">
            {views} {views === 1 ? "read" : "reads"}
          </span>
        </>
      )}
    </div>
    <div className="flex items-center gap-2">
      {!!tags?.length && (
        <>
          <Chip size="sm" variant="flat">
            {tags[0]?.name}
          </Chip>
          <Divider orientation="vertical" className="h-3.5 ml-1 mr-0" />
        </>
      )}
      <Button isIconOnly size="sm" variant="light">
        {bookmarked ? (
          <BookmarkSolidIcon className="text-foreground-500" />
        ) : (
          <BookmarkIcon className="text-foreground-500" />
        )}
      </Button>
    </div>
  </CardFooter>
);

const ArticleCard: FC<ArticleCardProps> = ({ article, className }) => {
  return (
    <Card className={cn("max-w-3xl p-3", className)} shadow="sm">
      <ArticleCardHeader {...article} />
      <ArticleCardBody {...article} />
      <ArticleCardFooter {...article} />
    </Card>
  );
};

export default ArticleCard;
