import { getTag } from "@/api/tag";
import { RssIcon } from "@/components/icons";
import Button from "@/shared/Button";
import Card, { CardBody } from "@/shared/Card";
import Typography from "@/shared/Typography";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import { Link } from "@nextui-org/react";
import { FC } from "react";
import CopyLink from "./CopyLink";

interface TagCardProps {
  slug: string;
}

export const TagCard: FC<TagCardProps> = async ({ slug }) => {
  const { name, followersCount, postsCount } = (await getTag({ slug })) || {};

  return (
    <Card>
      <CardBody>
        <Typography variant="h2" className="text-2xl font-semibold">
          {name}
        </Typography>
        <WithSeparatorDot className="text-foreground-500">
          <span>#{slug}</span>
          <span>{followersCount} followers</span>
          <span>{postsCount} articles</span>
        </WithSeparatorDot>
        <div className="mt-6 flex items-center gap-3">
          <Button size="sm" color="primary" className="font-medium">
            Follow tag
          </Button>
          <Button size="sm" variant="bordered" className="font-medium">
            Write an article
          </Button>
          <CopyLink />
          <Button
            as={Link}
            isIconOnly
            size="sm"
            variant="bordered"
            href={`/tags/${slug}/rss`}
          >
            <RssIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
