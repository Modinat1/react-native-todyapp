import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import React from "react";
import { View } from "react-native";
import { useAppStore } from "../store/store";
import AddTodoModal from "./AddTodoModal";
import EmptyTodoCard from "./EmptyTodoCard";
import TodoCard from "./TodoCard";

const TodoApp = () => {
  const { todos } = useAppStore();

  const { openSheet, closeSheet } = useBottomSheetStore();

  const showModal = () => {
    openSheet({
      snapPoints: ["80%"],
      content: <AddTodoModal visible={true} onClose={closeSheet} />,
    });
  };

  const latestTodo = todos.length > 0 ? todos[todos.length - 1] : null;

  return (
    <View>
      {latestTodo ? (
        <TodoCard
          title={latestTodo.title}
          color={latestTodo.color}
          createdAt={new Date(latestTodo.id).toDateString()}
        />
      ) : (
        <EmptyTodoCard onPress={showModal} />
      )}
    </View>
  );
};

export default TodoApp;
