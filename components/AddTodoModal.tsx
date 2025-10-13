import { TodoServices } from "@/api/services/todoServices";
import {
  CalenderIcon,
  // ClockIcon,
  // FlagIcon,
  SendIcon,
} from "@/assets";

import { useMutation } from "@tanstack/react-query";

import { colors } from "@/colorSettings";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { useState } from "react";
import {
  ActivityIndicator,
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
// import TimePicker from "./TimePicker";

type AddTodoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
  const { selectedTheme } = useAppStore();
  const { openCalenderSheet, closeCalenderSheet } = useBottomSheetStore();

  const [task, setTask] = useState("");

  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState("");

  const handleSetDueDate = (date: string) => {
    setDueDate(date);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      todoTitle: string;
      description: string;
      theme: string;
      status: string;
      dueDate: string;
    }) => TodoServices.postTodo(payload),
    onSuccess: (data) => {
      // console.log("data:::::::::", data.data);

      Toast.show({
        type: "success",
        text1: "Todo added successfully ✅",
        visibilityTime: 2000,
      });

      // Clear inputs
      setTask("");
      setDescription("");

      onClose();
    },
    onError: (error: any) => {
      console.log(error, "error creating todo");

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

    const payload = {
      todoTitle: task,
      description: description,
      theme: selectedTheme.name,
      status: "pending",
      dueDate: dueDate,
    };

    console.log("Todo payload:::::::::", payload);

    const res = await mutateAsync(payload);
    console.log("res posting todo::::::", res.data);
  };

  const showDatePicker = () => {
    openCalenderSheet({
      calenderSnapPoints: ["90%"],
      calenderContent: (
        <DatePicker
          visible={true}
          onClose={() => {
            closeCalenderSheet();
          }}
          onSelectedDueDate={handleSetDueDate}
        />
      ),
    });
  };

  // const showTimePicker = () => {
  //   openSheet({
  //     snapPoints: ["60%"],
  //     content: (
  //       <TimePicker
  //         visible={true}
  //         onClose={() => {
  //           closeSheet();
  //         }}
  //       />
  //     ),
  //   });
  // };

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
        <TouchableOpacity
          onPress={showDatePicker}
          className="flex-row items-center gap-2"
        >
          <CalenderIcon />
          <Text className="text-[#A9B0C5] text-base">
            {dueDate ? dueDate : "Enter due date"}
          </Text>
        </TouchableOpacity>
        {/* Add button */}
        <View className="flex-row justify-end items-center border-b pb-5 border-secondary-foreground">
          {/* <View className="flex-row items-center gap-5">
            <TodoListIcon />
            <TouchableOpacity onPress={showDatePicker}>
              <CalenderIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimePicker}>
              <ClockIcon />
            </TouchableOpacity>
            <FlagIcon />
          </View> */}

          <TouchableOpacity onPress={handleAdd} disabled={isPending}>
            {isPending ? (
              <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
            ) : (
              <SendIcon />
            )}
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
        <Text className="text-center text-destructive text-base">{error}</Text>
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
