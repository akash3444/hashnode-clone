import { auth } from "@/lib/auth";
import { Link } from "@nextui-org/link";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { LogoStandard } from "../icons";
import { LoginButton } from "./LoginButton";
import MoreDropdown from "./MoreDropdown";
import NavbarLinks from "./NavbarLinks";
import { NavbarUser } from "./NavbarUser";
import { ThemeToggle } from "./ThemeToggle";
import ColorPaletteManager from "./ColorPaletteManager";

const Navbar = async () => {
  const session = await auth();

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
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarLinks />
        <NavbarItem>
          <MoreDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-3">
        <NavbarItem>
          <ColorPaletteManager />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        {session?.user ? (
          <NavbarUser user={session.user} />
        ) : (
          <NavbarItem>
            <LoginButton />
          </NavbarItem>
        )}
      </NavbarContent>
    </Nav>
  );
};

export default Navbar;
