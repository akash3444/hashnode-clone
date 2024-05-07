import { getUserInfo } from "@/api-handlers/user";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import Card, { CardBody, CardFooter, CardHeader } from "@/shared/Card";
import Typography from "@/shared/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import { ConnectionTabs } from "./ConnectionTabs";
import { JoinedDate } from "./JoinedDate";
import { Location } from "./Location";
import { UserFollowButton } from "./UserFollowButton";

export const ConnectionsWrapper = async ({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) => {
  const user = await getUserInfo(username);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start px-2 md:px-6">
      <Card>
        <CardHeader>
          <img
            src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt={user.name}
            className="h-20 w-20 rounded-full"
          />
        </CardHeader>
        <CardBody>
          <Link href={`/users/${username}`}>
            <Typography variant="h2">{user.name}</Typography>
          </Link>
          <p className="text-foreground-600 dark:text-foreground-200">
            {user.tagline}
          </p>
        </CardBody>
        <CardFooter className="block space-y-3">
          <UserFollowButton following={user.following} />
          <Location location={user.location} />
          <JoinedDate dateJoined={user.dateJoined} />
        </CardFooter>
      </Card>
      <Card className="lg:col-span-2">
        <CardBody>
          <ConnectionTabs
            followersCount={user.followersCount}
            followingsCount={user.followingsCount}
          />
          {children}
        </CardBody>
      </Card>
    </div>
  );
};
