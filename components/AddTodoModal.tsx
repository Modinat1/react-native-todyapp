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
import EmojiSelector from "react-native-emoji-selector";
import { useAppStore } from "../store/store";

type AddTodoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddTodoModal({ visible, onClose }: AddTodoModalProps) {
  const { addTodo, selectedTheme } = useAppStore();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleAdd = () => {
    if (task.trim()) {
      addTodo(task);
      setTask("");
      setDescription("");
      setShowEmojis(false);
      onClose();
    }
  };

  return (
    // <Modal animationType="slide" visible={visible} transparent>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.overlay}
    >
      <View style={styles.container}>
        {/* Task input */}
        <TextInput
          placeholder="Eg: Meeting with client"
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

        {/* Toggle emoji picker */}
        <TouchableOpacity
          onPress={() => setShowEmojis((prev) => !prev)}
          style={styles.emojiButton}
        >
          <Text style={{ fontSize: 24 }}>😊</Text>
        </TouchableOpacity>

        {/* Add button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: selectedTheme.color }]}
          onPress={handleAdd}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Add</Text>
        </TouchableOpacity>

        {/* Emoji Picker */}
        {showEmojis && (
          <View style={{ height: 250 }}>
            <EmojiSelector
              onEmojiSelected={(emoji) => setTask((prev) => prev + emoji)}
              showSearchBar={false}
              showTabs={true}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    borderBottomWidth: 1,
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
