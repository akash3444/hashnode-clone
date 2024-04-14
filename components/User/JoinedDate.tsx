import { formatDate } from "@/lib/utils";
import { CalendarIcon } from "../icons";

export const JoinedDate = ({ dateJoined }: { dateJoined: string }) => {
  return (
    dateJoined && (
      <div className="flex items-center gap-2 text-foreground-500">
        <CalendarIcon />
        <span>Member since {formatDate(dateJoined, "MMMM, yyyy")}</span>
      </div>
    )
  );
};
