"use client";

import { Challenge } from "@/lib/types";
import Typography from "@/shared/Typography";
import { FC, use } from "react";

const Challenges: FC<{
  challengesPromise: Promise<Challenge[]>;
}> = ({ challengesPromise }) => {
  const challenges = use(challengesPromise);

  return (
    <div className="space-y-6">
      {challenges?.map(({ _id, image, title, tagline }) => (
        <div key={_id} id={_id} className="flex items-start gap-5">
          <div>
            <Typography variant="h5" className="mb-1">
              {title}
            </Typography>
            <Typography className="dark:text-foreground-400">
              {tagline}
            </Typography>
          </div>
          <img src={image} alt={title} className="h-20 aspect-square" />
        </div>
      ))}
    </div>
  );
};

export default Challenges;
