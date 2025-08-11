import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import EmojiSelector from "react-native-emoji-selector";
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
import Toast from "react-native-toast-message";
import { useAppStore } from "../store/store";

type AddTodoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
  const { userId } = useAuthStore();
  const { addTodo } = useAppStore();

  console.log("userId:::", userId);

  const [task, setTask] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.overlay}
    >
      <View style={styles.container}>
        {/* Task input */}
        <TextInput
          placeholder="eg: Meeting with client"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        {/* Description */}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />

        {/* Add button */}
        <View className="flex-row justify-between items-center border-b pb-5 border-border">
          <View className="flex-row items-center gap-3">
            <TodoListIcon />
            <CalenderIcon />
            <ClockIcon />
            <FlagIcon />
          </View>

          <TouchableOpacity onPress={handleAdd} disabled={isPending}>
            <SendIcon />
          </TouchableOpacity>
        </View>

        {/* Toggle emoji picker */}
        <TouchableOpacity
          //   onPress={() => setShowEmojis((prev) => !prev)}
          style={styles.emojiButton}
        >
          <Text style={{ fontSize: 24 }}>😊</Text>
        </TouchableOpacity>

        <Text>{error}</Text>

        {/* Emoji button etc. omitted for brevity */}
      </View>
    </KeyboardAvoidingView>
  );
}

// export default function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
//   const { addTodo } = useAppStore();
//   const [task, setTask] = useState("");
//   const [description, setDescription] = useState("");
//   //   const [showEmojis, setShowEmojis] = useState(false);

//   const handleAdd = () => {
//     if (!task.trim()) return;
//     addTodo(task);
//     setTask("");
//     Toast.show({
//       type: "success",
//       text1: "Todo added successfully ✅",
//       visibilityTime: 2000,
//     });
//     onClose();
//   };

//   return (
//     // <Modal animationType="slide" visible={visible} transparent>
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={styles.overlay}
//     >
//       <View style={styles.container}>
//         {/* Task input */}
//         <TextInput
//           placeholder="eg: Meeting with client"
//           value={task}
//           onChangeText={setTask}
//           style={styles.input}
//         />

//         {/* Description */}
//         <TextInput
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           style={styles.input}
//           multiline
//         />

//         {/* Add button */}

//         <View className="flex-row justify-between items-center border-b pb-5 border-border">
//           <View className="flex-row items-center gap-3">
//             <TodoListIcon />
//             <CalenderIcon />
//             <ClockIcon />
//             <FlagIcon />
//           </View>

//           <TouchableOpacity onPress={handleAdd}>
//             <SendIcon />
//           </TouchableOpacity>
//         </View>

// {/* Toggle emoji picker */}
// <TouchableOpacity
//   //   onPress={() => setShowEmojis((prev) => !prev)}
//   style={styles.emojiButton}
// >
//   <Text style={{ fontSize: 24 }}>😊</Text>
// </TouchableOpacity>

//         {/* Emoji Picker */}
//         {/* {showEmojis && (
//           <View style={{ height: 250 }}>
//             <EmojiSelector
//               onEmojiSelected={(emoji) => setTask((prev) => prev + emoji)}
//               showSearchBar={false}
//               showTabs={true}
//             />
//           </View>
//         )} */}
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    // borderBottomWidth: 1,
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
