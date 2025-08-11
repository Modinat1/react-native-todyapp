import { useGetTodos } from "@/api/hooks/todo";
import { Search } from "@/assets";
import { colors } from "@/colorSettings";
import BackButton from "@/components/BackButton";
import Card from "@/components/Card";
import Container from "@/components/Container";
import { Todo } from "@/lib/types";
// import useAuthStore from "@/store/features/useAuthStore";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const Boards = () => {
  // const { userId } = useAuthStore();
  const { data, isLoading } = useGetTodos();
  // const { data, isLoading } = useGetUserTodos(userId ?? 0);
  const [filter, setFilter] = useState<"inProgress" | "completed">(
    "inProgress"
  );
  const [menuVisible, setMenuVisible] = useState(false);

  const TodoData = data?.todos || [];

  const inProgressTodo = TodoData.filter((todo: Todo) => !todo.completed);
  const completedTodo = TodoData.filter((todo: Todo) => todo.completed);

  const displayedTodos =
    filter === "inProgress" ? inProgressTodo : completedTodo;

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold">Try Boards</Text>
        <Search />
      </View>

      <View className="flex-row justify-between items-center my-5">
        <Text className="text-black text-xl font-bold">
          {filter === "inProgress" ? "In Progress" : "Completed"}
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Entypo name="dots-three-vertical" size={15} color="#A0AAB8" />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      {menuVisible && (
        <View
          style={{
            position: "absolute",
            top: 120,
            right: 20,
            backgroundColor: "white",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            padding: 10,
            zIndex: 99,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFilter("inProgress");
              setMenuVisible(false);
            }}
            style={{ paddingVertical: 8 }}
          >
            <Text style={{ color: colors.primary.DEFAULT, fontWeight: "600" }}>
              In Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setFilter("completed");
              setMenuVisible(false);
            }}
            style={{ paddingVertical: 8 }}
          >
            <Text style={{ color: colors.primary.DEFAULT, fontWeight: "600" }}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View className="justify-center items-center h-screen">
          <ActivityIndicator color={colors.primary.DEFAULT} />
          <Text className="text-primary font-medium text-sm">Loading...</Text>
        </View>
      ) : displayedTodos.length === 0 ? (
        <View className="justify-center items-center h-screen">
          <Text className="text-gray-500 font-medium text-base">
            No todos yet 👀
          </Text>
        </View>
      ) : (
        <Card data={displayedTodos} />
      )}
    </Container>
  );
};

export default Boards;
