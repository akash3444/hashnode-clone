import { clsx, ClassValue } from "clsx";
import { format } from "date-fns/format";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomain(url: string) {
  // Remove protocol and www. prefix if present
  var domain = url.replace(/(^\w+:|^)\/\/(www\.)?/, "");

  // Get the domain part before the first slash if there is any path
  var domainParts = domain.split("/");
  domain = domainParts[0];

  return domain;
}

export const formatDate = (date: any, dateFormat?: string) => {
  return format(date, dateFormat || "MMM dd, yyyy");
};
