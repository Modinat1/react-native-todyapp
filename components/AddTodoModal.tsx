import { TodoServices } from "@/api/services/todoServices";
import {
  CalenderIcon,
  ClockIcon,
  FlagIcon,
  SendIcon,
  TodoListIcon,
} from "@/assets";
import useAuthStore from "@/store/features/useAuthStore";
import { useMutation } from "@tanstack/react-query";
// import EmojiPicker from "react-native-emoji-picker";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useAppStore } from "../store/store";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

type AddTodoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
  const { userId } = useAuthStore();
  const { addTodo } = useAppStore();
  const { openSheet, closeSheet } = useBottomSheetStore();

  console.log("userId:::", userId);

  const [task, setTask] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const [showEmojis, setShowEmojis] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      todo: string;
      completed: boolean;
      userId: number;
    }) => TodoServices.postTodo(payload),
    onSuccess: (data) => {
      addTodo(data.data);

      Toast.show({
        type: "success",
        text1: "Todo added successfully ✅",
        visibilityTime: 2000,
      });

      // Clear inputs
      setTask("");
      setDescription("");
      setIsDone(false);

      onClose();
    },
    onError: (error: any) => {
      setError(error?.message || "Failed to add todo");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "Failed to add todo",
      });
    },
  });

  const handleAdd = async () => {
    if (!task.trim()) {
      Toast.show({
        type: "info",
        text1: "Please enter a task",
      });
      return;
    }

    if (!userId) {
      Toast.show({
        type: "error",
        text1: "User ID missing",
      });
      return;
    }

    const payload = {
      todo: task,
      completed: isDone,
      userId,
    };

    await mutateAsync(payload);
  };

  const showDatePicker = () => {
    openSheet({
      snapPoints: ["60%"],
      content: (
        <DatePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  const showTimePicker = () => {
    openSheet({
      snapPoints: ["60%"],
      content: (
        <TimePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.overlay}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        {/* Task input */}
        <TextInput
          placeholder="eg: Meeting with client"
          value={task}
          onChangeText={setTask}
          style={styles.input}
          placeholderTextColor="#A9B0C5"
        />
        {/* Description */}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          placeholderTextColor="#A9B0C5"
          multiline
        />
        {/* Add button */}
        <View className="flex-row justify-between items-center border-b pb-5 border-secondary-foreground">
          <View className="flex-row items-center gap-5">
            <TodoListIcon />
            <TouchableOpacity onPress={showDatePicker}>
              <CalenderIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimePicker}>
              <ClockIcon />
            </TouchableOpacity>
            <FlagIcon />
          </View>

          <TouchableOpacity onPress={handleAdd} disabled={isPending}>
            <SendIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          // onPress={() => setShowEmojis((prev) => !prev)}
          style={styles.emojiButton}
          className="flex-row gap-3 items-center"
        >
          <Text style={{ fontSize: 24 }}>😊</Text>
          <Text style={{ fontSize: 24 }}>😂</Text>
          <Text style={{ fontSize: 24 }}>😇</Text>
          <Text style={{ fontSize: 24 }}>🙌</Text>
          <Text style={{ fontSize: 24 }}>👋</Text>
          <Text style={{ fontSize: 24 }}>😨</Text>
          <Text style={{ fontSize: 24 }}>✌️</Text>
          <Text style={{ fontSize: 24 }}>💪</Text>
        </TouchableOpacity>
        {/* <EmojiPicker /> */}
        <Text>{error}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  emojiButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  addButton: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 12,
  },
});
