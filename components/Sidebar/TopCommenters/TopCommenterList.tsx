import { getTopCommenters } from "@/api/feed";
import Button from "@/shared/Button";
import Tooltip from "@/shared/Tooltip";
import UserInfo from "../../UserInfo";
import { CheckIcon, FollowIcon } from "../../icons";

const TopCommenterList = async () => {
  const topCommenters = await getTopCommenters();

  return topCommenters?.edges?.map(({ node: author }) => (
    <div key={author._id} className="flex items-center justify-between">
      <UserInfo author={author} size="sm" />
      <Tooltip content="Follow">
        <Button isIconOnly size="sm" variant="light">
          {author.following ? (
            <CheckIcon className="text-success" />
          ) : (
            <FollowIcon />
          )}
        </Button>
      </Tooltip>
    </div>
  ));
};

export default TopCommenterList;
