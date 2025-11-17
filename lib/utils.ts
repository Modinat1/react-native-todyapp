import { themes } from "@/lib/data";
import { MD3LightTheme } from "react-native-paper";
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

export const formatTime2 = (timeString?: Date | string) => {
  if (!timeString) return "No time";

  let time: Date;

  if (typeof timeString === "string") {
    // Parsing to "HH:MM" format
    const [hours, minutes] = timeString.split(":").map(Number);
    time = new Date();
    time.setHours(hours, minutes, 0, 0);
  } else {
    time = new Date(timeString);
  }

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

export const timePickerCustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#24A19C", // Clock hand, active elements
    onPrimary: "#FFFFFF", // Text on clock hand and confirm button
    surface: "#FFFFFF", // Modal background
    surfaceVariant: "#E5E7EB", // 🟢 Clock face background (change from purple → gray)
    outline: "#24A19C", // Hour circle outline
    onSurfaceVariant: "#000000", // Clock numbers
    secondaryContainer: "#24A19C", // some versions use this
    onSecondaryContainer: "#FFFFFF",
    primaryContainer: "#24A19C", // others use this for AM/PM active bg
    onPrimaryContainer: "#FFFFFF",
    background: "#F9FAFB", // Screen background
    onSurface: "#000000", // inactive text color
    backdrop: "rgba(0,0,0,0.3)",
  },
};

export const getInitials = (name: string) => {
  if (!name) return "NA";
  const parts = name.split(" ");
  const initials = parts.map((part) => part[0].toUpperCase()).join("");
  return initials;
};
