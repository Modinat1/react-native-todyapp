import { themes } from "@/lib/data";
import { FlatList } from "react-native";
import ThemeCard from "./ThemeCard";

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
