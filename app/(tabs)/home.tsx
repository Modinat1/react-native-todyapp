import { Setting } from "@/assets";
import Container from "@/components/Container";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TodoApp from "../../components/TodoInput";

export default function App() {
  const router = useRouter();

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <View className="">
          <Text className="text-2xl font-semibold text-black mb-3">Today</Text>
          <Text className="text-sm font-normal text-secondary">
            Best platform for creating to-do lists
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/(main)/settings")}>
          <Setting />
        </TouchableOpacity>
      </View>
      <TodoApp />
    </Container>
  );
}
