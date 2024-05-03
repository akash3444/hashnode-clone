"use client";

import { TableOfContent } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { ChevronRight } from "../icons";

interface TableOfContentsProps {
  tableOfContents?: TableOfContent[];
  isChildren?: boolean;
  highlightActiveItem?: boolean;
  onItemClick?: () => void;
}

const getToc = (tableOfContents: TableOfContent[], activeItem: string) => {
  const activeItems: Record<string, boolean> = {};
  const toc: Record<string, TableOfContent[]> = {};

  tableOfContents.forEach((item) => {
    if (`#heading-${item.slug.toLowerCase()}` === activeItem) {
      activeItems[item.id] = true;
      if (item.parentId) activeItems[item.parentId] = true;
    }

    if (item.parentId) {
      toc[item.parentId] = toc[item.parentId]
        ? [...toc[item.parentId], item]
        : [item];
    }
  });

  return { activeItems, toc };
};

export const TableOfContents: FC<TableOfContentsProps> = ({
  tableOfContents,
  isChildren,
  highlightActiveItem,
  onItemClick = () => {},
}) => {
  const activeItem =
    typeof window !== "undefined" ? window?.location?.hash : "";

  if (!tableOfContents || !tableOfContents?.length) {
    return null;
  }

  const { activeItems, toc } = getToc(tableOfContents, activeItem);

  return (
    <ul
      className={cn("space-y-1", {
        "pl-4": isChildren,
        "-ml-2": !isChildren,
      })}
    >
      {tableOfContents?.map(({ id, title, parentId, slug }) => {
        const hash = `#heading-${slug.toLowerCase()}`;

        return (
          (!parentId || isChildren) && (
            <li key={id} onClick={onItemClick}>
              <Link
                href={hash}
                className={cn(
                  "p-2 rounded-lg hover:bg-foreground-100 dark:hover:bg-foreground-900 flex items-center gap-2",
                  {
                    "text-foreground-500 dark:text-foreground-400": isChildren,
                    "text-primary-500": highlightActiveItem && activeItems[id],
                  }
                )}
              >
                {isChildren && <ChevronRight className="h-3 w-3" />}
                {title}
              </Link>
              {!!toc[id] && (
                <TableOfContents
                  tableOfContents={toc[id]}
                  highlightActiveItem={highlightActiveItem}
                  isChildren
                />
              )}
            </li>
          )
        );
      })}
    </ul>
  );
};
