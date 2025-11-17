import { TodoServices } from "@/api/services/todoServices";
import { CalenderIcon, ClockIcon, SendIcon } from "@/assets";

import { useMutation } from "@tanstack/react-query";

import { colors } from "@/colorSettings";
import { useEmojiTracker } from "@/lib/hooks";
import { formatTime2 } from "@/lib/utils";
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
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import { useAppStore } from "../store/store";
import DatePicker from "./DatePicker";
import TimeModal from "./TimeModal";

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
  const [dueTime, setDueTime] = useState(new Date());
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const { trackEmoji, getMostUsedEmojis } = useEmojiTracker();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const quickEmojis = getMostUsedEmojis(8);

  const handleEmojiPress = (emoji: string) => {
    setDescription((prev) => prev + emoji);
    trackEmoji(emoji);
  };

  const handleEmojiSelect = (emoji: EmojiType) => {
    setDescription((prev) => prev + emoji.emoji);
    trackEmoji(emoji.emoji);
  };

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
      dueTime: Date;
    }) => TodoServices.postTodo(payload),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Todo added successfully",
        visibilityTime: 2000,
      });

      // Clear inputs
      setTask("");
      setDescription("");
      setDueDate("");
      setDueTime(new Date());

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
      dueTime: dueTime,
    };
    // console.log("payload:::::::", payload);

    await mutateAsync(payload);
    setDueTime(new Date());
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

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.overlay}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="eg: Meeting with client"
              value={task}
              onChangeText={setTask}
              style={styles.taskInput}
              placeholderTextColor="#A9B0C5"
            />
          </View>

          {/* Description */}
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholderTextColor="#A9B0C5"
              multiline
            />
            <TouchableOpacity
              onPress={() => setIsEmojiPickerOpen(true)}
              style={[styles.emojiButtonInside, { bottom: 8 }]}
            >
              <Text style={styles.emojiIconInside}>😊</Text>
            </TouchableOpacity>
          </View>

          {/* Due Date */}
          <TouchableOpacity
            onPress={showDatePicker}
            className="flex-row items-center gap-2"
          >
            <CalenderIcon />
            <Text className="text-[#A9B0C5] text-base">
              {dueDate ? dueDate : "Enter due date"}
            </Text>
          </TouchableOpacity>

          {/* Due Time */}
          <TouchableOpacity
            className="flex-row gap-3 items-center mt-3"
            onPress={() => setOpenTimeModal(true)}
          >
            <ClockIcon />

            <Text className="text-[#A9B0C5]">
              {dueTime ? formatTime2(dueTime) : "Enter due Time"}
            </Text>
          </TouchableOpacity>

          {/* Add button */}
          <View className="flex-row justify-end items-center border-b pb-5 border-secondary-foreground">
            <TouchableOpacity onPress={handleAdd} disabled={isPending}>
              {isPending ? (
                <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
              ) : (
                <SendIcon />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.quickEmojiContainer}>
            <Text style={styles.quickEmojiLabel}>Quick:</Text>
            <View style={styles.emojiContainer}>
              {quickEmojis.map((emoji, i) => (
                <TouchableOpacity
                  key={`${emoji}-${i}`}
                  onPress={() => handleEmojiPress(emoji)}
                  style={styles.emojiButton}
                >
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {error && (
            <Text className="text-center text-destructive text-base">
              {error}
            </Text>
          )}
        </View>

        <TimeModal
          openTimeModal={openTimeModal}
          setOpenTimeModal={setOpenTimeModal}
          dueTime={dueTime}
          setDueTime={setDueTime}
        />
      </KeyboardAwareScrollView>

      {/* Emoji Picker Modal */}
      <EmojiPicker
        onEmojiSelected={handleEmojiSelect}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        enableRecentlyUsed
        categoryPosition="top"
        theme={{
          container: "#FFFFFF",
          header: "#F3F4F6",
          knob: "#D1D5DB",
          category: {
            icon: colors.primary.DEFAULT,
            iconActive: colors.primary.DEFAULT,
            container: "#F9FAFB",
            containerActive: "#E5E7EB",
          },
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
  },
  taskInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    paddingRight: 40,
  },
  emojiButtonInside: {
    position: "absolute",
    right: 8,
    padding: 4,
  },
  emojiIconInside: {
    fontSize: 18,
  },
  input: {
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  quickEmojiContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  quickEmojiLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  emojiContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
  },
  emojiButton: {
    padding: 2,
  },
  emoji: {
    fontSize: 18,
  },
});
