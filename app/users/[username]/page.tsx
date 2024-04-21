import { getUser } from "@/api/user";
import {
  JoinedDate,
  Location,
  ProfileActions,
  SocialMediaHandles,
} from "@/components/User";
import UserBadges from "@/components/User/UserBadges";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { formatNumberWithSuffix } from "@/lib/utils";
import Card, { CardHeader } from "@/shared/Card";
import Typography from "@/shared/Typography";
import { CardBody, Chip, Link } from "@nextui-org/react";
import { Metadata } from "next";
import Image from "next/image";
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

  if (!user) return notFound();

  return (
    <Card fullWidth className="py-10 px-24">
      <CardHeader className="mb-2 gap-10">
        <div className="shrink-0 relative h-40 w-40 border rounded-full">
          <Image
            src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
            alt={user.username}
            fill
            className="rounded-full"
          />
        </div>

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
              <p className="mt-3 mb-6 text-lg text-foreground-700">
                {user.tagline}
              </p>
            </div>
            <ProfileActions name={user.name} />
          </div>

          <Link
            href={`/users/${username}/followers`}
            className="text-foreground-700"
          >
            <b>{formatNumberWithSuffix(user.followersCount)}</b>
            <span>&nbsp;followers</span>
          </Link>
        </div>
      </CardHeader>

      <CardBody>
        <Card>
          <CardBody className="flex-row items-center gap-10 justify-center">
            <div className="flex items-center gap-1">
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
                <p className="text-foreground-600">{user.bio.text}</p>
              ) : (
                <p className="my-14 text-center text-foreground-500">
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
                <p className="text-foreground-600">{user.availableFor}</p>
              ) : (
                <p className="my-14 text-center text-foreground-500">
                  Nothing to show
                </p>
              )}
            </CardBody>
          </Card>
          <UserBadges badges={user.badges} />
        </div>
      </CardBody>
    </Card>
  );
};

export default UserPage;
