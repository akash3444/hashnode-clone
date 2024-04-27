import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Typography from "@/shared/Typography";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import Image from "next/image";
import { FC } from "react";
import { FeaturedChip } from "../Feed";
import { BookIcon } from "../icons";
import { Reactions } from "./Reactions";

interface PostHeaderProps {
  post: Article;
}

export const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  return (
    <>
      <Typography
        variant="h1"
        className="text-2xl md:text-4xl sm:max-w-lg md:max-w-2xl sm:mx-auto lg:max-w-none lg:text-[52px] text-center font-black lg:leading-[1.2] px-6 sm:px-0"
      >
        {post.title}
      </Typography>
      <div className="mt-8 flex flex-col items-center gap-6 md:hidden">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 bg-slate-200 rounded-full">
            <Image
              src={post.author.profilePicture}
              alt={post.author.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-foreground-600 dark:text-foreground-200">
            {post.author.name}
          </span>
        </div>
        <WithSeparatorDot className="flex items-center justify-center text-lg gap-4 text-foreground-500">
          {formatDate(post.featuredAt) && (
            <span>{formatDate(post.featuredAt)}</span>
          )}
          {post.readTimeInMinutes && (
            <div className="flex items-center gap-2">
              <BookIcon />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
          )}
        </WithSeparatorDot>
      </div>
      <WithSeparatorDot className="mt-10 hidden md:flex items-center justify-center text-lg gap-4 text-foreground-500 dark:text-foreground-400">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 bg-slate-200 rounded-full">
            <Image
              src={post.author.profilePicture}
              alt={post.author.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-foreground-600 dark:text-foreground-200">
            {post.author.name}
          </span>
        </div>
        {formatDate(post.featuredAt) && (
          <span>{formatDate(post.featuredAt)}</span>
        )}
        {post.readTimeInMinutes && (
          <div className="flex items-center gap-2">
            <BookIcon />
            <span>{post.readTimeInMinutes} min read</span>
          </div>
        )}
      </WithSeparatorDot>
      <div className="mt-8 flex items-center justify-center gap-3 md:gap-6">
        {post.featured && <FeaturedChip size="lg" />}
        <Reactions likedBy={post.likedBy} />
      </div>
    </>
  );
};
