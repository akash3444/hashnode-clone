import ConnectionList from "@/components/User/ConnectionList";
import { FC } from "react";

interface FollowingPageProps {
  params: { username: string };
}

const FollowingPage: FC<FollowingPageProps> = ({ params: { username } }) => {
  return <ConnectionList username={username} type="following" />;
};

export default FollowingPage;
