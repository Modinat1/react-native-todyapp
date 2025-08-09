import { colors } from "@/colorSettings";
import React from "react";
import { FlatList } from "react-native";
import ThemeCard from "./ThemeCard";

const themes = [
  {
    id: 1,
    color:
      typeof colors.primary === "string"
        ? colors.primary
        : colors.primary.DEFAULT,
  },
  {
    id: 2,
    color: typeof colors.black === "string" ? colors.black : colors.black,
  },
  {
    id: 3,
    color:
      typeof colors.error === "string" ? colors.error : colors.error.DEFAULT,
  },
  { id: 4, color: typeof colors.blue === "string" ? colors.blue : colors.blue },
];

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
