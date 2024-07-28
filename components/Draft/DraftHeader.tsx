import Button from "@/shared/Button";
import React from "react";

export const DraftHeader = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="space-x-2">
        <Button variant="bordered">Preview</Button>
        <Button color="primary">Publish</Button>
      </div>
    </div>
  );
};
