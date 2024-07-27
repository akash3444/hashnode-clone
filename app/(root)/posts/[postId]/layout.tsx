import { FC, ReactNode } from "react";

interface PostLayoutProps {
  children: ReactNode;
}

const PostLayout: FC<PostLayoutProps> = ({ children }) => {
  return (
    <main className="max-w-6xl mx-auto py-6">
      <article>{children}</article>
    </main>
  );
};

export default PostLayout;
