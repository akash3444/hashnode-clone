import { ChatBubble, FeaturedIcon, SeriesIcon } from "@/components/icons";
import { Article } from "@/lib/types";
import Card from "@/shared/Card";
import Typography from "@/shared/Typography";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import { CardBody, CardFooter, CardHeader, CardProps } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { FC } from "react";
import UserInfo from "../UserInfo";
import { BookmarkButton } from "./BookmarkButton";

interface ArticleCardProps extends CardProps {
  article: Article;
}

const ArticleCardHeader: FC<Article> = ({
  author,
  dateAdded,
  url,
  isFeatured,
  publication,
}) => (
  <CardHeader className="flex items-center justify-between px-0 md:px-2 pt-4 md:pt-2">
    <UserInfo
      author={author}
      dateAdded={dateAdded}
      url={url}
      publication={publication}
      showProBadge
    />
    {isFeatured && (
      <Link href="/featured">
        <Chip
          color="secondary"
          variant="flat"
          className="px-0 md:px-2"
          classNames={{ content: "flex items-center gap-2 font-semibold" }}
        >
          <FeaturedIcon />
          <span className="hidden md:inline">Featured</span>
        </Chip>
      </Link>
    )}
  </CardHeader>
);

const ArticleCardBody: FC<Article> = ({ id, brief, coverImage, title }) => (
  <CardBody
    className="flex flex-col md:flex-row gap-4 justify-between px-0 md:px-2"
    as={NextLink}
    href={`/posts/${id}`}
    target="_blank"
  >
    <div>
      <Typography variant="h1" className="mb-2">
        {title}
      </Typography>
      <Typography className="hidden md:block md:line-clamp-3 dark:text-foreground-400">
        {brief}
      </Typography>
    </div>
    {!!coverImage && (
      <div className="md:max-w-sm w-full aspect-video rounded-lg">
        <img
          src={coverImage.url}
          alt={title}
          className="rounded-lg object-cover w-full h-full md:h-auto aspect-video bg-foreground-100 dark:bg-foreground-900"
        />
      </div>
    )}
  </CardBody>
);

const ArticleCardFooter: FC<Article> = ({
  id,
  bookmarked,
  tags,
  totalReactions,
  views,
  series,
  publication,
}) => (
  <CardFooter className="flex items-center justify-between text-foreground-500 dark:text-foreground-300 px-0 md:px-2 pb-4 md:pb-2">
    <WithSeparatorDot>
      <Link
        color="foreground"
        size="sm"
        className="leading-none text-foreground-600 dark:text-foreground-300"
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
      {series && (
        <Link
          href={`${publication.url}/series/${series.slug}`}
          className="hidden md:block"
        >
          <Chip
            size="sm"
            variant="flat"
            color="primary"
            className="px-2"
            classNames={{
              content: "max-w-[25ch] overflow-hidden text-ellipsis",
            }}
            startContent={<SeriesIcon className="h-4 w-4 mr-0.5" />}
          >
            {series.name}
          </Chip>
        </Link>
      )}
      {!!tags?.length && (
        <>
          <Link href={`/tags/${tags[0].slug}`} className="hidden md:block">
            <Chip
              size="sm"
              variant="flat"
              classNames={{
                content: "max-w-[15ch] overflow-hidden text-ellipsis",
              }}
            >
              {tags[0]?.name}
            </Chip>
          </Link>
          <Divider
            orientation="vertical"
            className="hidden md:block h-3.5 ml-1 mr-0"
          />
        </>
      )}
      <BookmarkButton
        postId={id}
        bookmarked={bookmarked}
        buttonProps={{ size: "sm" }}
        iconClassName="text-foreground-500"
      />
    </div>
  </CardFooter>
);

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="p-0 border-0 border-b rounded-none md:p-3 md:border md:rounded-2xl">
      <ArticleCardHeader {...article} />
      <ArticleCardBody {...article} />
      <ArticleCardFooter {...article} />
    </Card>
  );
};

export default ArticleCard;
