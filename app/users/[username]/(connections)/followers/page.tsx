import ConnectionList from "@/components/User/ConnectionList";
import { FC } from "react";

interface FollowersPageProps {
  params: { username: string };
}

const FollowersPage: FC<FollowersPageProps> = ({ params: { username } }) => {
  return <ConnectionList username={username} type="followers" />;
};

export default FollowersPage;
