"use client";

import { Challenge } from "@/lib/types";
import Typography from "@/shared/Typography";
import { Tab, Tabs } from "@nextui-org/tabs";
import { FC, ReactNode, Suspense, useState } from "react";
import Challenges from "./Challenges";
import ChallengesSkeleton from "./ChallengesSkeleton";

interface ChallengeTabsProps {
  children?: ReactNode;
  challengesPromise: Promise<Challenge[]>;
}

const ChallengeTabs: FC<ChallengeTabsProps> = ({
  children,
  challengesPromise,
}) => {
  const [selectedKey, setSelectedKey] = useState("upForGrabs");

  return (
    <>
      <Tabs
        fullWidth
        className="mb-7"
        selectedKey={selectedKey}
        onSelectionChange={(selectedKey) =>
          setSelectedKey(selectedKey as string)
        }
      >
        <Tab key="upForGrabs" title="Up for grabs">
          <Suspense fallback={<ChallengesSkeleton />}>
            <Challenges challengesPromise={challengesPromise} />
          </Suspense>
        </Tab>
        <Tab key="completed" title="Completed">
          <Typography className="text-center text-base text-foreground-500">
            You haven&apos;t completed any
            <br /> challenge yet.
          </Typography>
        </Tab>
      </Tabs>
      {children}
    </>
  );
};

export default ChallengeTabs;
