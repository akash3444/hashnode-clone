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

export const formatNumberWithSuffix = (number: number) => {
  if (number >= 1e12) return (number / 1e12).toFixed(1) + "T"; // Trillions
  if (number >= 1e9) return (number / 1e9).toFixed(1) + "B"; // Billions
  if (number >= 1e6) return (number / 1e6).toFixed(1) + "M"; // Millions
  if (number >= 1e3) return (number / 1e3).toFixed(1) + "K"; // Thousands

  return number.toString(); // Less than thousands, return the number as is
};

export const getTwitterShareUrl = (text: string) =>
  encodeURI(`https://twitter.com/intent/tweet?text=${text}`);

export const getLinkedInShareUrl = (url: string) =>
  encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
