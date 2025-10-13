import {
  DocumentIcon,
  Filter,
  Key,
  Logout,
  MagicPen,
  MessageQuestion,
  MetalStar,
  Priority,
  Profile,
  Setting2,
  Sun,
  TaskIcon,
  ThumbIcon,
  Weight,
} from "@/assets";
import { colors } from "@/colorSettings";

export const themes = [
  {
    id: 1,
    name: "green",
    color: "#24A19C",
    // color:
    //   typeof colors.primary === "string"
    //     ? colors.primary
    //     : colors.primary.DEFAULT,
  },
  {
    id: 2,
    name: "black",
    color: colors.black,
    // color: typeof colors.black === "string" ? colors.black : colors.black,
  },
  {
    id: 3,
    name: "red",
    color: colors.error.DEFAULT,
    // color:
    //   typeof colors.error === "string" ? colors.error : colors.error.DEFAULT,
  },
  {
    id: 4,
    name: "blue",
    color: colors.blue,
    // color: typeof colors.blue === "string" ? colors.blue : colors.blue,
  },
] as const;

export const categoryItems = [
  {
    id: 1,
    title: "Assigned to me",
    icon: <Filter />,
  },
  {
    id: 2,
    title: "Priority 1",
    icon: <Priority />,
  },
  {
    id: 3,
    title: "Priority 3",
    icon: <ThumbIcon />,
  },
  {
    id: 4,
    title: "Manage Filter",
    icon: <Setting2 />,
  },
];

export const labelItems = [
  {
    id: 1,
    title: "Masana label",
    icon: <TaskIcon />,
  },
  {
    id: 2,
    title: "Manage labels",
    icon: <Setting2 />,
  },
];

export const projectItems = [
  {
    id: 1,
    title: "Instructions For Use",
    icon: <MessageQuestion />,
    route: "/(main)/instructions",
  },
  {
    id: 2,
    title: "Try Boards",
    icon: <DocumentIcon />,
    route: "/(main)/boards",
  },
  {
    id: 3,
    title: "Manage Projects",
    icon: <Setting2 />,
  },
];

export const settingsItems = [
  {
    id: 1,
    title: "Account",
    icon: <Profile />,
  },
  {
    id: 2,
    title: "Theme",
    icon: <MagicPen />,
  },
  {
    id: 3,
    title: "App Icon",
    icon: <MetalStar />,
  },
  {
    id: 4,
    title: "Productivity",
    icon: <Weight />,
  },
  {
    id: 5,
    title: "Change Mode",
    icon: <Sun />,
  },
];

export const settingOtherItems = [
  {
    id: 1,
    title: "Privacy Policy",
    icon: <Key />,
  },
  {
    id: 2,
    title: "Help Center",
    icon: <MessageQuestion />,
  },
  {
    id: 3,
    title: "Log Out",
    icon: <Logout />,
  },
];
