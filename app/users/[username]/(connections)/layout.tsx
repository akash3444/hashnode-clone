import { ConnectionsWrapper } from "@/components/User";
import React, { FC, ReactNode } from "react";

interface ConnectionsLayoutProps {
  children: ReactNode;
  params: { username: string };
}

const ConnectionsLayout: FC<ConnectionsLayoutProps> = ({
  children,
  params: { username },
}) => {
  return (
    <ConnectionsWrapper username={username}>{children}</ConnectionsWrapper>
  );
};

export default ConnectionsLayout;
