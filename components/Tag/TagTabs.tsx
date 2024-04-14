"use client";

import { Tab, Tabs } from "@/shared/Tabs";
import { usePathname, useRouter } from "next/navigation";
import { ClockIcon, FireIcon } from "../icons";

export const TagTabs = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs
      aria-label="Options"
      className="mb-6"
      selectedKey={pathname.endsWith("/recent") ? "recent" : "hot"}
      onSelectionChange={(selectedKey) =>
        router.push(
          selectedKey === "hot" ? `/tags/${slug}` : `${pathname}/recent`
        )
      }
    >
      <Tab
        key="hot"
        title={
          <div className="flex items-center space-x-2">
            <FireIcon />
            <span>Hot</span>
          </div>
        }
      />
      <Tab
        key="recent"
        title={
          <div className="flex items-center space-x-2">
            <ClockIcon />
            <span>New</span>
          </div>
        }
      />
    </Tabs>
  );
};
