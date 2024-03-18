import { Article } from "@/lib/types";
import Button from "@/shared/Button";
import { CardBody } from "@/shared/Card";
import WithSeparatorDot from "@/shared/WithSeparatorDot";
import { Dispatch, FC, SetStateAction } from "react";
import { ChevronDown } from "../../icons";

interface TrendingArticleListProps {
  articles: Article[];
  showAllArticles: boolean;
  setShowAllArticles: Dispatch<SetStateAction<boolean>>;
}

const TrendingArticleList: FC<TrendingArticleListProps> = ({
  articles,
  showAllArticles,
  setShowAllArticles,
}) => {
  return (
    <CardBody className="space-y-6">
      {articles?.map(({ id, author, title, views }) => (
        <div key={id}>
          <h4 className="mb-1.5 font-semibold line-clamp-2">{title}</h4>
          <WithSeparatorDot className="text-sm text-foreground-500 font-medium">
            <span>{author.name}</span>
            <span>
              {views} {views === 1 ? "read" : "reads"}
            </span>
          </WithSeparatorDot>
        </div>
      ))}
      {!showAllArticles && (
        <Button
          variant="bordered"
          size="md"
          onClick={() => setShowAllArticles(true)}
        >
          See more <ChevronDown />
        </Button>
      )}
    </CardBody>
  );
};

export default TrendingArticleList;
