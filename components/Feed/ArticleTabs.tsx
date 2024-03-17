"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { ClockIcon, FeaturedIcon, MagicWandIcon } from "../icons";
import { usePathname, useRouter } from "next/navigation";

export const ArticleTabs = () => {
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
      <Tab
        key="featured"
        title={
          <div className="flex items-center space-x-2">
            <FeaturedIcon />
            <span>Featured</span>
          </div>
        }
      />
      <Tab
        key="recent"
        title={
          <div className="flex items-center space-x-2">
            <ClockIcon />
            <span>Recent</span>
          </div>
        }
      />
    </Tabs>
  );
};
