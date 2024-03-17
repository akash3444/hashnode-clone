import { getTopCommenters } from "@/api/feed";
import Button from "@/shared/Button";
import Card, { CardBody, CardHeader } from "@/shared/Card";
import Image from "next/image";
import { FollowIcon } from "../icons";
import Tooltip from "@/shared/Tooltip";

const TopCommenters = async () => {
  const topCommenters = await getTopCommenters();

  return (
    <Card>
      <CardHeader className="pt-2 justify-between gap-5">
        <h2 className="text-xl font-bold shrink-0">Top commenters this week</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        {topCommenters?.edges?.map(
          ({ node: { id, photo, username, name } }) => (
            <div key={id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    src={photo}
                    alt={name}
                    className="rounded-full object-cover"
                  />
                </div>
                <h5 className="font-semibold text-sm">{name}</h5>
              </div>
              <Tooltip content="Follow">
                <Button isIconOnly size="sm" variant="light">
                  <FollowIcon />
                </Button>
              </Tooltip>
            </div>
          )
        )}
      </CardBody>
    </Card>
  );
};

export default TopCommenters;
