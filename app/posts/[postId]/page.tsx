import { getPost } from "@/api-handlers/post";
import Newsletter from "@/components/Newsletter";
import { PostContent, PostHeader, TableOfContents } from "@/components/Post";
import { PostActions } from "@/components/Post/PostActions";
import { UserFollowButton } from "@/components/User/UserFollowButton";
import { auth } from "@/lib/auth";
import Card from "@/shared/Card";
import Typography from "@/shared/Typography";
import { CardBody, Chip } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

interface PostPageProps {
  params: { postId: string };
}

interface Props {
  params: { postId: string };
}

export const generateMetadata = async ({
  params: { postId },
}: Props): Promise<Metadata> => {
  const session = await auth();
  const {
    coverImage,
    seo: { title, description },
  } =
    (await getPost({
      postId,
      authenticatedUserIds: session?.user?.id ? [session?.user?.id] : [],
    })) || {};
  const coverImageUrl = encodeURIComponent(
    `${coverImage?.url}?w=1200&h=630&fit=crop&crop=entropy&auto=compress,format&format=webp&fm=png`
  );
  const imageUrl = `https://hashnode.com/utility/r?url=${coverImageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: coverImage?.url ? [{ url: imageUrl }] : [],
    },
  };
};

const PostPage: FC<PostPageProps> = async ({ params: { postId } }) => {
  const session = await auth();
  const post = await getPost({
    postId,
    authenticatedUserIds: session?.user?.id ? [session?.user?.id] : [],
  });

  return (
    post && (
      <div className="pt-6 pb-10">
        <PostHeader post={post} />

        {/* Table of contents */}
        {post.features?.tableOfContents?.isEnabled && (
          <div className="px-6 md:p-0">
            <Card className="mt-16 max-w-2xl mx-auto">
              <CardBody>
                <Typography variant="h3" className="mb-4 font-semibold">
                  Table of contents
                </Typography>
                <TableOfContents
                  tableOfContents={post.features?.tableOfContents?.items}
                />
              </CardBody>
            </Card>
          </div>
        )}

        {!!post.coverImage?.url && (
          <img
            src={post.coverImage?.url}
            alt=""
            className="my-14 w-full aspect-[18/9] object-cover"
          />
        )}

        <PostContent html={post.content.html} />

        <PostActions post={post} />

        {/* Newsletter */}
        <div className="mt-20 text-center max-w-lg mx-auto px-6 sm:px-0">
          <Newsletter
            authorName={post.author.name}
            publicationId={post.publication.id}
          />
        </div>

        {/* Tags */}
        <div className="mt-20 flex items-center justify-center flex-wrap gap-4">
          {post.tags.map(({ name, slug }) => (
            <Chip key={slug} as={Link} href={`/tags/${slug}`}>
              {name}
            </Chip>
          ))}
        </div>

        <div className="mt-16 px-6 xl:px-0">
          <p className="border-b text-foreground-500 leading-8 tracking-wide">
            Written by
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.profilePicture}
                alt={post.author.name}
                className="shrink-0 h-12 w-12 rounded-full bg-slate-100"
              />
              <Typography variant="h5" className="md:hidden">
                {post.author.name}
              </Typography>
            </div>
            <div className="max-w-2xl">
              <Typography variant="h5" className="hidden md:block">
                {post.author.name}
              </Typography>
              <p className="mt-1.5 text-foreground-600 dark:text-foreground-400 leading-7">
                {post.author.bio.text}
              </p>
            </div>

            <UserFollowButton
              username={post.author.username}
              following={post.author.following}
              className="mt-1 md:mt-0 md:ml-auto"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default PostPage;
