import { colors } from "@/colorSettings";
import React from "react";
import { FlatList } from "react-native";
import ThemeCard from "./ThemeCard";
// 24A19C
const themes = [
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

const ThemeSelector = () => {
  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ThemeCard theme={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default ThemeSelector;
