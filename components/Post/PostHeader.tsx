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
        className="text-[52px] text-center font-black leading-[1.2]"
      >
        {post.title}
      </Typography>
      <WithSeparatorDot className="mt-10 flex items-center justify-center text-lg gap-4 text-foreground-500">
        <div className="flex items-center gap-3.5">
          <div className="relative h-12 w-12 bg-slate-200 rounded-full">
            <Image
              src={post.author.profilePicture}
              alt={post.author.name}
              fill
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-foreground-600">
            {post.author.name}
          </span>
        </div>
        <span>{formatDate(post.featuredAt)}</span>
        {post.readTimeInMinutes && (
          <div className="flex items-center gap-2">
            <BookIcon />
            <span>{post.readTimeInMinutes} min read</span>
          </div>
        )}
      </WithSeparatorDot>
      <div className="mt-8 flex items-center justify-center gap-6">
        {post.featured && <FeaturedChip size="lg" />}
        <Reactions likedBy={post.likedBy} />
      </div>
    </>
  );
};
