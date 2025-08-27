import { Attach, SendIcon } from "@/assets";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface CommentProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}
const Comment = ({ modalVisible, setModalVisible }: CommentProps) => {
  const [comment, setComment] = useState("");

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        {/* Comment */}
        <TextInput
          placeholder="Typing..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholderTextColor="#A9B0C5"
          multiline
        />
        {/* Add button */}
        <View className="flex-row justify-between items-center border-b pb-5 border-secondary-foreground my-3">
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            {/* <TouchableOpacity onPress={handleAdd} disabled={isPending}> */}
            <Attach />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* <TouchableOpacity onPress={handleAdd} disabled={isPending}> */}
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

        {/* <Text>{error}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  input: {
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
  },
  emojiButton: {
    alignSelf: "flex-start",
    paddingVertical: 20,
  },
  addButton: {
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 12,
  },
});
