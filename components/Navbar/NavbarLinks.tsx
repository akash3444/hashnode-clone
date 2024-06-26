"use client";

import { navbarLinks } from "@/configs/navbar";
import Button from "@/shared/Button";
import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  return navbarLinks.map(({ text, href, matchPaths }, index) => (
    <NavbarItem key={index}>
      <Button
        variant="light"
        as={href ? Link : undefined}
        href={href}
        color={
          pathname === href || matchPaths?.includes(pathname)
            ? "primary"
            : "default"
        }
        className="font-semibold"
      >
        {text}
      </Button>
    </NavbarItem>
  ));
};

export default NavbarLinks;
