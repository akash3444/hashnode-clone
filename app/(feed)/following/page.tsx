import Feed from "@/components/Feed";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Following feed on Hashnode",
  description: "Following feed on Hashnode",
  openGraph: {
    title: "Following feed on Hashnode",
    description: "Following feed on Hashnode",
    images: [
      {
        url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1697709257859/6413332e-a3c0-4d37-bc72-f65293cb6664.png?auto=compress",
      },
    ],
  },
};

export default async function Recent() {
  const session = await auth();

  if (!session?.user) notFound();

  return <Feed feedType="FOLLOWING" />;
}
