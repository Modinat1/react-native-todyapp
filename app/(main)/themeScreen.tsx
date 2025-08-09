import Button from "@/components/Button";
import Container from "@/components/Container";
import ThemeSelector from "@/components/ThemeSelector";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";

const ThemeScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Text className="text-2xl text-center font-semibold text-black my-3">
        Create to do list
      </Text>
      <Text className="text-sm text-center font-normal text-secondary">
        Choose your to do list color theme
      </Text>

      <ThemeSelector />

      <Button className="mb-10" onPress={() => router.push("/(tabs)/home")}>
        Open Todyapp
      </Button>
    </Container>
  );
};

export default ThemeScreen;
