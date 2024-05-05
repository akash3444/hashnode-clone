import { getTopCommenters } from "@/api/feed";
import UserInfo from "../../UserInfo";
import { FollowCommenterButton } from "./FollowCommenterButton";

const TopCommenterList = async () => {
  const topCommenters = await getTopCommenters();

  return topCommenters?.edges?.map(({ node: author }) => (
    <div key={author._id} className="flex items-center justify-between">
      <UserInfo author={author} size="sm" />
      <FollowCommenterButton
        username={author.username}
        following={author.following}
      />
    </div>
  ));
};

export default TopCommenterList;
