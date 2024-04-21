import { getPost } from "@/api/post";
import Newsletter from "@/components/Newsletter";
import { PostContent, PostHeader, TableOfContents } from "@/components/Post";
import { PostActions } from "@/components/Post/PostActions";
import Button from "@/shared/Button";
import Card from "@/shared/Card";
import Typography from "@/shared/Typography";
import { CardBody, Chip } from "@nextui-org/react";
import { Metadata } from "next";
import Image from "next/image";
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
  const {
    coverImage,
    seo: { title, description },
  } = await getPost(postId);
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
  const post = await getPost(postId);

  return (
    post && (
      <div className="pt-6 pb-10">
        <PostHeader post={post} />

        {/* Table of contents */}
        {post.features?.tableOfContents?.isEnabled && (
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
        )}

        {!!post.coverImage?.url && (
          <div className="my-14 relative aspect-[18/9]">
            <Image
              src={post.coverImage?.url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}

        <PostContent html={post.content.html} />

        <PostActions post={post} />

        {/* Newsletter */}
        <div className="mt-20 text-center max-w-lg mx-auto ">
          <Newsletter
            authorName={post.author.name}
            publicationId={post.publication.id}
          />
        </div>

        {/* Tags */}
        <div className="mt-20 flex items-center justify-center gap-4">
          {post.tags.map(({ name, slug }) => (
            <Chip key={slug} as={Link} href={`/tags/${slug}`}>
              {name}
            </Chip>
          ))}
        </div>

        <div className="mt-16">
          <p className="border-b text-foreground-600">Written by</p>
          <div className="mt-6 flex items-start gap-4">
            <div className="shrink-0 relative h-12 w-12 rounded-full bg-slate-100">
              <Image
                src={post.author.profilePicture}
                alt={post.author.name}
                fill
                className="rounded-full"
              />
            </div>
            <div className="max-w-2xl">
              <Typography variant="h5">{post.author.name}</Typography>
              <p className="mt-1.5 text-foreground-600">
                {post.author.bio.text}
              </p>
            </div>

            <Button color="primary" variant="bordered" className="ml-auto">
              Follow
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default PostPage;
