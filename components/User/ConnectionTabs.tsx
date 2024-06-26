"use client";

import { Tab, Tabs } from "@/shared/Tabs";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC } from "react";

interface ConnectionTabsProps {
  followersCount: number;
  followingsCount: number;
}

export const ConnectionTabs: FC<ConnectionTabsProps> = ({
  followersCount,
  followingsCount,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { username } = useParams();

  return (
    <Tabs
      aria-label="Connections"
      variant="underlined"
      className="mb-6"
      selectedKey={pathname.endsWith("/followers") ? "followers" : "following"}
      onSelectionChange={(selectedKey) =>
        router.push(`/users/${username}/${selectedKey}`)
      }
    >
      <Tab key="followers" title={<span>Followers ({followersCount})</span>} />
      <Tab
        key="following"
        title={<span>Following ({Math.max(followingsCount - 1, 0)})</span>}
      />
    </Tabs>
  );
};
