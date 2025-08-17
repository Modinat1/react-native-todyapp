import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import AddTodoModal from "./AddTodoModal";
import EmptyTodoCard from "./EmptyTodoCard";
import VoiceTodo from "./VoiceRecorder";

const TodoApp = () => {
  const { openSheet, closeSheet } = useBottomSheetStore();

  const showModal = () => {
    openSheet({
      snapPoints: ["60%"],
      content: (
        <AddTodoModal
          visible={true}
          onClose={() => {
            closeSheet();
            Toast.show({
              type: "success",
              text1: "Todo added successfully ✅",
            });
          }}
        />
      ),
    });
  };

  return (
    <View>
      <EmptyTodoCard onPress={showModal} />

      <VoiceTodo />
    </View>
  );
};

export default TodoApp;
