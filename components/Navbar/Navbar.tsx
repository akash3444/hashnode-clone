"use client";

import Button from "@/shared/Button";
import { Link } from "@nextui-org/link";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { LogoStandard } from "../icons";
import MoreDropdown from "./MoreDropdown";
import NavbarLinks from "./NavbarLinks";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <Nav
      maxWidth="2xl"
      isBlurred
      isBordered
      className="dark:bg-slate-900 dark:border-slate-800"
    >
      <NavbarBrand className="cursor-pointer" as={Link} href="/">
        <LogoStandard className="h-7 w-auto text-black dark:text-white" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarLinks />
        <NavbarItem>
          <MoreDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="hidden lg:flex">
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="default" variant="light">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Nav>
  );
};

export default Navbar;
