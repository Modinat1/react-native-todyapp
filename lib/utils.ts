import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

export const formatDate = (date: Date) => {
  return date.toDateString();
};
