import Sidebar from "@/components/Sidebar";
import React, { FC } from "react";

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout: FC<FeedLayoutProps> = ({ children }) => {
  return (
    <main className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto py-6">
      <div className="col-span-2">{children}</div>
      <aside>
        <Sidebar />
      </aside>
    </main>
  );
};

export default FeedLayout;
