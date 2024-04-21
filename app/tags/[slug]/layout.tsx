import { getTag } from "@/api/tag";
import Sidebar from "@/components/Sidebar";
import { DEFAULT_TAG_LOGO } from "@/lib/constants";
import StickyBox from "@/shared/StickyBox";
import { Metadata } from "next";
import React, { FC } from "react";

interface FeedLayoutProps {
  children: React.ReactNode;
}

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({
  params: { slug },
}: Props): Promise<Metadata> => {
  const { followersCount, postsCount, logo } = await getTag({ slug });
  const title = `#${slug} on Hashnode`;
  const description = `${slug} (${followersCount} followers · ${postsCount} articles)`;
  const image = logo || DEFAULT_TAG_LOGO;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
};

const FeedLayout: FC<FeedLayoutProps> = ({ children }) => {
  return (
    <main className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto py-6">
      <div className="col-span-2">{children}</div>
      <aside>
        <StickyBox offsetTop={90} offsetBottom={20}>
          <Sidebar />
        </StickyBox>
      </aside>
    </main>
  );
};

export default FeedLayout;
