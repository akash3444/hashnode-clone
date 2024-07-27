import React, { FC, ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return <main className="lg:max-w-6xl lg:px-6 mx-auto py-6">{children}</main>;
};

export default UserLayout;
