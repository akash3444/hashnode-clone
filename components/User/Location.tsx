import React from "react";
import { LocationIcon } from "../icons";

export const Location = ({ location }: { location: string }) => {
  return (
    location && (
      <div className="flex items-center gap-2 text-foreground-500">
        <LocationIcon /> {location}
      </div>
    )
  );
};
