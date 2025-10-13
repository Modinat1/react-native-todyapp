import { themes } from "@/lib/data";
import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

export const formatTime = (timeString?: Date) => {
  if (!timeString) return "No time";
  const time = new Date(timeString);
  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (dateString?: Date) => {
  if (!dateString) return "No Date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getThemeColor = (colour: string) => {
  const theme = themes.find((t) => t.name === colour);
  return theme ? theme.color : "#24A19C";
};
