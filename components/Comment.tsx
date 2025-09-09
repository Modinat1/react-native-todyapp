import { useGetTodo } from "@/api/hooks/todo";
import { Attach, SendIcon } from "@/assets";
import { colors } from "@/colorSettings";
import useAuthStore from "@/store/features/useAuthStore";
import useCommentStore from "@/store/features/useCommentStore";
import * as FileSystem from "expo-file-system";
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
  commentModalVisible: boolean;
  setCommentModalVisible: (commentModalVisible: boolean) => void;

  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  todoId: string;
}
const Comment = ({
  commentModalVisible,
  modalVisible,
  setModalVisible,
  setCommentModalVisible,
  todoId,
}: CommentProps) => {
  const { data } = useGetTodo(todoId);
  const { attachments } = useCommentStore();
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  // console.log("data from comment:::", JSON.stringify(data, null, 2));

  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("todoId", todoId);
      formData.append("commenterText", comment);

      for (const [index, att] of attachments.entries()) {
        const uploadUri = await getUploadableFile(att.uri);
        formData.append("attachments", {
          uri: uploadUri,
          name: att.name ?? `file_${index}.jpg`,
          type: att.mimeType ?? "image/jpeg",
        } as any);
      }

      const res = await fetch("https://todybackend.onrender.com/comment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setIsLoading(false);
      setComment("");
      setCommentModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Comment added successfully ✅",
        visibilityTime: 2000,
      });
      console.log(await res.text());
    } catch (error) {
      console.log("error from posting comment", error);
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Error adding comment";
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
  };

  async function getUploadableFile(uri: string) {
    const filename = uri.split("/").pop();
    if (!FileSystem.cacheDirectory) {
      throw new Error("Cache directory is not available.");
    }
    const newPath = FileSystem.cacheDirectory + filename;
    await FileSystem.copyAsync({ from: uri, to: newPath });
    return newPath;
  }

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

          <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
            ) : (
              <SendIcon />
            )}
            {/* <SendIcon /> */}
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
