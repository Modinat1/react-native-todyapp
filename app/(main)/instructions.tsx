import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Text, View } from "react-native";

const instructionsData = [
  {
    id: 1,
    title: "Tips and tricks",
    instructions: [
      "Use click Add to create task!",
      "Start own project!",
      "Organize these tasks!",
      "Schedule this task",
    ],
  },
  {
    id: 2,
    title: "Tips and tricks",
    instructions: [
      "What do you thing about Todoapp",
      "Visit the help center",
      "How to use Todoapp",
      "Get organize anywhere",
      "Kickstart your project",
    ],
  },
];
const Instructions = () => {
  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold">Instructions</Text>
        <Search />
      </View>

      {instructionsData.map((item) => {
        return (
          <View key={item.id} className="mt-5">
            <View className="flex-row justify-between items-center my-2">
              <Text className="text-lg font-medium text-black">
                {item.title}
              </Text>
              <Entypo name="dots-three-vertical" size={15} color="#767E8C" />
            </View>

            <View className="border-b border-border w-full pb-2"></View>

            <View className="my-3">
              {item.instructions.map((instruction, index) => {
                return (
                  <View key={index}>
                    <Text className="text-base font-normal text-secondary my-3">
                      {instruction}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </Container>
  );
};

export default Instructions;
