import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  StackOverflowIcon,
  WebIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons";
import { User } from "@/lib/types";
import Button from "@/shared/Button";
import Link from "next/link";
import { FC } from "react";

const socialMediaIcons = {
  website: WebIcon,
  github: GithubIcon,
  twitter: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  stackoverflow: StackOverflowIcon,
  linkedin: LinkedInIcon,
  youtube: YoutubeIcon,
};

interface SocialMediaHandlesProps {
  links: User["socialMediaLinks"];
}

export const SocialMediaHandles: FC<SocialMediaHandlesProps> = ({ links }) => {
  const linkList = Object.entries(links);

  return linkList.map(([platform, link]) => {
    const Icon = socialMediaIcons[platform as keyof User["socialMediaLinks"]];

    return (
      !!link && (
        <Button
          key={platform}
          as={Link}
          href={link}
          isIconOnly
          size="sm"
          variant="light"
          target="_blank"
        >
          <Icon className="text-foreground-500 dark:text-foreground-400" />
        </Button>
      )
    );
  });
};
