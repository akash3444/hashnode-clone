"use client";

import { getUserProfileSummary } from "@/api-handlers/feed";
import { UserProfile } from "@/lib/types";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UserProfileSummarySkeleton } from "./UserProfileSummarySkeleton";
import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";

export const UserProfileSummary = ({ userId }: { userId: string }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [user, setUser] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfileSummary(userId);
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (isLoading) {
    return <UserProfileSummarySkeleton />;
  }

  return (
    user && (
      <Card
        shadow="none"
        className="w-full max-w-[300px] border-none bg-transparent"
      >
        <CardHeader className="justify-between gap-6">
          <div className="flex gap-3">
            <Avatar
              radius="full"
              size="md"
              src={user.photo || DEFAULT_PROFILE_PICTURE}
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-500">
                @{user.username}
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="text-small pl-px text-default-500">{user.tagline}</p>
          {user.publicationDomain && (
            <Link href={user.publicationDomain} size="sm" className="mt-2">
              {user.publicationDomain}
            </Link>
          )}
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-600 text-small">
              {user.numFollowing}
            </p>
            <p className=" text-default-500 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-600 text-small">
              {user.numFollowers}
            </p>
            <p className="text-default-500 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>
    )
  );
};
