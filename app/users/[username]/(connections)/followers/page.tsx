import { getUserInfo } from "@/api/user";
import ConnectionList from "@/components/User/ConnectionList";
import { Metadata } from "next";
import { FC } from "react";

interface FollowersPageProps {
  params: { username: string };
}

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const { name, tagline, profilePicture } = await getUserInfo(username);
  const title = `${name}: Followers — Hashnode`;
  const description = `${name}'s profile on Hashnode. ${tagline}`;
  const coverImageUrl = encodeURIComponent(
    `${profilePicture}?w=400&h=300&fit=crop&crop=faces&auto=compress,format&format=webp`
  );
  const imageUrl = `https://hashnode.com/utility/r?url=${coverImageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
    },
  };
};

const FollowersPage: FC<FollowersPageProps> = ({ params: { username } }) => {
  return <ConnectionList username={username} type="followers" />;
};

export default FollowersPage;
