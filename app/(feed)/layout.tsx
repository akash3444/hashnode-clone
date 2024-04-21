import { ArticleTabs } from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import StickyBox from "@/shared/StickyBox";
import React, { FC } from "react";

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout: FC<FeedLayoutProps> = ({ children }) => {
  return (
    <main className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto py-6">
      <div className="col-span-2">
        <ArticleTabs />
        {children}
      </div>
      <aside>
        <StickyBox offsetTop={90} offsetBottom={20}>
          <Sidebar />
        </StickyBox>
      </aside>
    </main>
  );
};

export default FeedLayout;
