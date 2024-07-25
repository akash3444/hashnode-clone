import { getUser } from "@/api-handlers/user";
import {
  JoinedDate,
  Location,
  ProfileActions,
  SocialMediaHandles,
} from "@/components/User";
import RecentActivity from "@/components/User/RecentActivity";
import TechStack from "@/components/User/TechStack";
import UserBadges from "@/components/User/UserBadges";
import { auth } from "@/lib/auth";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { formatNumberWithSuffix } from "@/lib/utils";
import Card, { CardHeader } from "@/shared/Card";
import Typography from "@/shared/Typography";
import { CardBody, Chip, Link } from "@nextui-org/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

interface UserPageProps {
  params: { username: string };
}

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const { name, tagline, profilePicture } = await getUser(username);
  const title = `${name} - Hashnode`;
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

const UserPage: FC<UserPageProps> = async ({ params: { username } }) => {
  const user = await getUser(username);
  const session = await auth();

  const isOwnProfile = user.id === session?.user?.id;

  if (!user) return notFound();

  return (
    <Card className="border-0 lg:border py-0 md:py-10 px-6 lg:px-24">
      <CardHeader className="mb-2 flex-col md:flex-row gap-4 lg:gap-10 items-start">
        <img
          src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
          alt={user.username}
          className="shrink-0 h-24 w-24 lg:h-40 lg:w-40 border rounded-full"
        />

        <div className="w-full">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="flex items-center">
                <Typography variant="h1" className="mr-4 text-3xl">
                  {user.name}
                </Typography>
                {user.isPro && (
                  <Chip
                    size="lg"
                    color="primary"
                    variant="flat"
                    classNames={{
                      content: "font-semibold",
                    }}
                  >
                    Pro
                  </Chip>
                )}
              </div>
              <p className="mt-3 mb-1 md:mb-6 text-lg text-foreground-700 dark:text-foreground-200">
                {user.tagline}
              </p>
            </div>
            <ProfileActions
              user={user}
              className="hidden md:flex"
              isOwnProfile={isOwnProfile}
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/users/${username}/followers`}
              className="hidden md:flex text-foreground-700 dark:text-foreground-200"
            >
              <b>{formatNumberWithSuffix(user.followersCount)}</b>
              <span>&nbsp;followers</span>
            </Link>
            <Link
              href={`/users/${username}/following`}
              className="hidden md:flex text-foreground-700 dark:text-foreground-200"
            >
              <b>{formatNumberWithSuffix(user.followingsCount ?? 0)}</b>
              <span>&nbsp;following</span>
            </Link>
          </div>
        </div>

        <ProfileActions
          user={user}
          className="flex md:hidden flex-row-reverse"
          isOwnProfile={isOwnProfile}
        />

        <div className="mt-2 mb-4 flex items-center gap-4">
          <Link
            href={`/users/${username}/followers`}
            className="flex md:hidden text-foreground-700 dark:text-foreground-200"
          >
            <b>{formatNumberWithSuffix(user.followersCount)}</b>
            <span>&nbsp;followers</span>
          </Link>
          <Link
            href={`/users/${username}/following`}
            className="flex md:hidden text-foreground-700 dark:text-foreground-200"
          >
            <b>{formatNumberWithSuffix(user.followingsCount ?? 0)}</b>
            <span>&nbsp;following</span>
          </Link>
        </div>
      </CardHeader>

      <CardBody>
        <Card>
          <CardBody className="flex-col md:flex-row items-start md:items-center gap-2.5 md:gap-10 justify-center">
            <div className="-ml-1.5 md:ml-0 flex items-center gap-1">
              <SocialMediaHandles links={user.socialMediaLinks} />
            </div>
            <Location location={user.location} />
            <JoinedDate dateJoined={user.dateJoined} />
          </CardBody>
        </Card>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardBody>
              <Typography variant="h2" className="mb-3">
                About Me
              </Typography>
              {user.bio.text ? (
                <p className="text-foreground-600 dark:text-foreground-200">
                  {user.bio.text}
                </p>
              ) : (
                <p className="my-14 text-center text-foreground-500 dark:text-foreground-400">
                  No bio to display
                </p>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h2" className="mb-3">
                I am available for
              </Typography>
              {user.availableFor ? (
                <p className="text-foreground-600 dark:text-foreground-200">
                  {user.availableFor}
                </p>
              ) : (
                <p className="my-14 text-center text-foreground-500 dark:text-foreground-400">
                  Nothing to show
                </p>
              )}
            </CardBody>
          </Card>
          <TechStack techStack={user.techStack} />
          <UserBadges badges={user.badges} />
          <RecentActivity />
        </div>
      </CardBody>
    </Card>
  );
};

export default UserPage;
