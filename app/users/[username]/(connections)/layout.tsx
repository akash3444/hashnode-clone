import { getUserInfo } from "@/api-handlers/user";
import { ConnectionsWrapper } from "@/components/User";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

interface ConnectionsLayoutProps {
  children: ReactNode;
  params: { username: string };
}

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const { name, tagline, profilePicture } = await getUserInfo(username);
  const title = `${name}: Following — Hashnode`;
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

const ConnectionsLayout: FC<ConnectionsLayoutProps> = ({
  children,
  params: { username },
}) => {
  return (
    <ConnectionsWrapper username={username}>{children}</ConnectionsWrapper>
  );
};

export default ConnectionsLayout;
