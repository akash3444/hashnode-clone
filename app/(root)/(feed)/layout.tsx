import { ArticleTabs } from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import StickyBox from "@/shared/StickyBox";
import React, { FC } from "react";

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout: FC<FeedLayoutProps> = async ({ children }) => {
  const session = await auth();

  return (
    <main className="max-w-4xl xl:max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto py-6 px-6 xl:px-0">
      <div className="col-span-3 xl:col-span-2">
        <ArticleTabs isAuthenticated={!!session?.user} />
        {children}
      </div>
      <aside className="hidden xl:block">
        <StickyBox offsetTop={90} offsetBottom={20}>
          <Sidebar />
        </StickyBox>
      </aside>
    </main>
  );
};

export default FeedLayout;
