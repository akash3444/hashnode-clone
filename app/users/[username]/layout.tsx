import React, { FC, ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return <main className="max-w-6xl mx-auto py-6">{children}</main>;
};

export default UserLayout;
