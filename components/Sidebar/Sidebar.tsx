import { getLatestChangelog, getTrendingArticles } from "@/api/sidebar";
import Changelog from "./Changelog";
import TopCommenters from "./TopCommenters";
import TrendingArticles from "./TrendingArticles";
import WritingChallenges from "./WritingChallenges";

const Sidebar = async () => {
  const changelog = await getLatestChangelog();
  const trendingArticles = await getTrendingArticles();

  return (
    <div className="space-y-6 sticky bottom-0">
      <Changelog changelog={changelog} />
      <TrendingArticles articles={trendingArticles?.posts} />
      <TopCommenters />
      <WritingChallenges />
    </div>
  );
};

export default Sidebar;
