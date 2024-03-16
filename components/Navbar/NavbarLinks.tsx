"use client";

import { navbarLinks } from "@/configs/navbar";
import Button from "@/shared/Button";
import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();
  console.log("pathname :", pathname);

  return navbarLinks.map(({ text, href }, index) => (
    <NavbarItem key={index}>
      <Button
        variant="light"
        as={href ? Link : undefined}
        href={href}
        color={pathname === href ? "primary" : "default"}
        className="font-semibold"
      >
        {text}
      </Button>
    </NavbarItem>
  ));
};

export default NavbarLinks;
