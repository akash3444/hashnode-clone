"use client";

import { getTrendingArticles } from "@/api/sidebar";
import { Article } from "@/lib/types";
import Card, { CardHeader } from "@/shared/Card";
import Select, { SelectItem } from "@/shared/Select";
import { ChangeEventHandler, FC, useState } from "react";
import TrendingArticleList from "./TrendingArticleList";
import TrendingArticleListSkeleton from "./TrendingArticleListSkeleton";
import Typography from "@/shared/Typography";

interface TrendingArticlesProps {
  articles: Article[];
}

const durationList = [
  {
    value: "7",
    label: "1 Week",
  },
  {
    value: "30",
    label: "1 Month",
  },
  {
    value: "90",
    label: "3 Months",
  },
  {
    value: "180",
    label: "6 Months",
  },
];

// TODO: IMPROVE
const TrendingArticles: FC<TrendingArticlesProps> = ({
  articles: initialArticles,
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(
    durationList[0]?.value
  );
  const filteredArticles = showAllArticles ? articles : articles?.slice(0, 3);

  const onDurationChange: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    if (!e.target.value) return;

    setSelectedDuration(e.target.value);

    setIsLoadingArticles(true);
    const trendingArticles = await getTrendingArticles(e.target.value);
    setArticles(trendingArticles?.posts);
    setIsLoadingArticles(false);
  };

  return (
    <Card>
      <CardHeader className="pt-2 justify-between gap-5">
        <Typography variant="h2" className="shrink-0">
          Trending Articles
        </Typography>
        <Select
          size="sm"
          selectedKeys={[selectedDuration]}
          onChange={onDurationChange}
        >
          {durationList.map((duration) => (
            <SelectItem key={duration.value} value={duration.value}>
              {duration.label}
            </SelectItem>
          ))}
        </Select>
      </CardHeader>
      {isLoadingArticles ? (
        <TrendingArticleListSkeleton />
      ) : (
        <TrendingArticleList
          articles={filteredArticles}
          showAllArticles={showAllArticles}
          setShowAllArticles={setShowAllArticles}
        />
      )}
    </Card>
  );
};

export default TrendingArticles;
