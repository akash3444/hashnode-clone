import { getLatestChangelog, getTrendingArticles } from "@/api/sidebar";
import Changelog from "./Changelog";
import TrendingArticles from "./TrendingArticles";
import TopCommenters from "./TopCommenters";

const Sidebar = async () => {
  const changelog = await getLatestChangelog();
  const trendingArticles = await getTrendingArticles();

  return (
    <div className="max-h-max">
      <div className="space-y-6 sticky bottom-0">
        <Changelog changelog={changelog} />
        <TrendingArticles articles={trendingArticles?.posts} />
        <TopCommenters />
      </div>
    </div>
  );
};

export default Sidebar;
