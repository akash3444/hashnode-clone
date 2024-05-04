"use client";

import { Tab, Tabs } from "@/shared/Tabs";
import { usePathname, useRouter } from "next/navigation";
import { ClockIcon, FeaturedIcon, MagicWandIcon, UsersIcon } from "../icons";

export const ArticleTabs = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs
      aria-label="Options"
      className="mb-6"
      selectedKey={pathname === "/" ? "personalized" : pathname.slice(1)}
      onSelectionChange={(selectedKey) =>
        router.push(selectedKey === "personalized" ? "/" : `/${selectedKey}`)
      }
    >
      <Tab
        key="personalized"
        title={
          <div className="flex items-center space-x-2">
            <MagicWandIcon />
            <span>Personalized</span>
          </div>
        }
      />
      {isAuthenticated ? (
        <Tab
          key="following"
          title={
            <div className="flex items-center space-x-2">
              <UsersIcon />
              <span>Following</span>
            </div>
          }
        />
      ) : (
        <Tab
          key="featured"
          title={
            <div className="flex items-center space-x-2">
              <FeaturedIcon />
              <span>Featured</span>
            </div>
          }
        />
      )}

      {isAuthenticated ? (
        <Tab
          key="featured"
          title={
            <div className="flex items-center space-x-2">
              <FeaturedIcon />
              <span>Featured</span>
            </div>
          }
        />
      ) : (
        <Tab
          key="recent"
          title={
            <div className="flex items-center space-x-2">
              <ClockIcon />
              <span>Recent</span>
            </div>
          }
        />
      )}
    </Tabs>
  );
};
