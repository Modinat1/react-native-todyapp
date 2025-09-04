import { useGetTodo } from "@/api/hooks/todo";
import { TodoServices } from "@/api/services/todoServices";
import { Attach, SendIcon } from "@/assets";
import { colors } from "@/colorSettings";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
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

interface CommentProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  todoId: string;
}
const Comment = ({ modalVisible, setModalVisible, todoId }: CommentProps) => {
  const { data } = useGetTodo(todoId);

  console.log(
    "data from comment:::",
    JSON.stringify(data?.todo?.comment, null, 2)
  );

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { commenterText: string }) =>
      TodoServices.addComment(todoId, payload),
    onSuccess: (data) => {
      console.log(
        "updating comment data:::::::::",
        JSON.stringify(data.data, null, 2)
      );

      Toast.show({
        type: "success",
        text1: "Comment added successfully ✅",
        visibilityTime: 2000,
      });

      setComment("");
      setModalVisible(false);
    },
    onError: (error: any) => {
      console.log(error);

      setError(error?.message || "Failed to add comment");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "Failed to add comment",
      });
    },
  });

  const handleAddComment = async () => {
    if (!comment.trim()) {
      Toast.show({
        type: "info",
        text1: "Please enter a comment",
      });
      return;
    }

    await mutateAsync({ commenterText: comment });
  };

  if (error) {
    console.log(error);
  }

  const todoComments = data?.todo?.comment;

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
            <Attach />
          </TouchableOpacity>

          <TouchableOpacity disabled={isPending} onPress={handleAddComment}>
            {isPending ? (
              <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
            ) : (
              <SendIcon />
            )}
          </TouchableOpacity>
        </View>

        {todoComments &&
          todoComments.length > 0 &&
          todoComments.map((comment) => (
            <View key={comment._id}>
              <Text>{comment.commenterText}</Text>
            </View>
          ))}
        {error && <Text className="text-destructive text-ms">{error}</Text>}
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
