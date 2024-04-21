import Feed from "@/components/Feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top developer articles",
  openGraph: {
    title: "Top developer articles",
    images: [
      {
        url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1697709257859/6413332e-a3c0-4d37-bc72-f65293cb6664.png?auto=compress",
      },
    ],
  },
};

export default function Home() {
  return <Feed />;
}
