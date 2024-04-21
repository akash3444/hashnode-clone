import Feed from "@/components/Feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent posts on Hashnode",
  description: "Recent developer posts on Hashnode",
  openGraph: {
    title: "Recent posts on Hashnode",
    description: "Recent developer posts on Hashnode",
    images: [
      {
        url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1697709257859/6413332e-a3c0-4d37-bc72-f65293cb6664.png?auto=compress",
      },
    ],
  },
};

export default function Recent() {
  return <Feed feedType="RECENT" />;
}
