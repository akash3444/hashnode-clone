import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { ChevronDown } from "../icons";
import Button from "@/shared/Button";

const MoreDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          className="font-semibold"
          endContent={<ChevronDown className="h-4" />}
        >
          More
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection
          showDivider
          classNames={{ group: "space-y-1", divider: "!mt-3" }}
        >
          <DropdownItem>Explore</DropdownItem>
          <DropdownItem>Hackathons</DropdownItem>
          <DropdownItem>Changelogs</DropdownItem>
          <DropdownItem>The Commit Podcast</DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem>Support</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default MoreDropdown;
