"use client";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { FC, useEffect, useState } from "react";

interface PostContentProps {
  html: string;
}

export const PostContent: FC<PostContentProps> = ({ html }) => {
  const [processedHtml, setProcessedHtml] = useState(html);

  useEffect(() => {
    const processHtml = () => {
      const container = document.createElement("div");
      container.innerHTML = html;
      container.querySelectorAll("pre > code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      return container.innerHTML;
    };

    setProcessedHtml(processHtml());
  }, []);

  return (
    <div
      className="prose mx-auto prose-p:text-lg md:prose-p:text-xl prose-p:leading-8 md:prose-p:leading-9 prose-p:tracking-wide prose-h1:text-3xl prose-h1:leading-10 md:prose-h1:text-4xl prose-h2:text-2xl md:prose-h2:text-3xl prose-tr:border prose-td:border prose-td:pl-4 prose-td:text-lg prose-td:py-2 prose-thead:font-semibold prose-thead:bg-foreground-50 prose-pre:p-0 prose-code:bg-foreground-200 prose-code:py-1 prose-code:px-2 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:font-medium prose-code:prose-pre:!text-base prose-code:prose-pre:bg-transparent px-6 md:px-0"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};
