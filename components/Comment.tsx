import { useGetComments, usePostComment } from "@/api/hooks/comment";
import { Attach, SendIcon } from "@/assets";
import { colors } from "@/colorSettings";
import useCommentStore from "@/store/features/useCommentStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Audio } from "expo-av";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { attachmentType } from "@/lib/types";
import Toast from "react-native-toast-message";
import AudioWaveForm from "./AudioWaveForm";
import Loader from "./Loader";

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
  const { attachments, clearAttachments } = useCommentStore();

  const [isLoading, setIsLoading] = useState(false);

  const { data: comments, isLoading: commentLoading } = useGetComments(todoId);
  // const postComment = usePostComment(todoId);
  // console.log("todoId from comment again::::", todoId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  // inside your comment component
  const postComment = usePostComment(todoId);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Get token from your auth store or context
      const token = useCommentStore.getState().token; // Replace with your actual token retrieval logic

      await postComment.mutateAsync({
        todoId,
        commenterText: comment,
        attachments, // your attachments array from useCommentStore
        token, // add token here
      });

      // reset UI on success
      setIsLoading(false);
      setComment("");
      setCommentModalVisible(false);
      clearAttachments();

      Toast.show({ type: "success", text1: "Comment added successfully ✅" });
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.message ?? "Error posting comment";
      Toast.show({ type: "error", text1: "Error", text2: message });
    }
  };

  if (error) {
    console.log(error);
  }

  const todoComments = comments?.comments;
  console.log("data from comment:::", JSON.stringify(todoComments, null, 2));

  // const downloadFile = async (uri: string | null) => {
  //   const fileUri = FileSystem.documentDirectory + uri.split("/").pop();
  //   const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
  //   alert("File downloaded to: " + localUri);
  // };

  const playAudio = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };
  // console.log("attachments::::", attachments);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* <View style={[styles.container, { flex: 1 }]}> */}
        {/* Post Comment */}
        <TextInput
          placeholder="Enter comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholderTextColor="#A9B0C5"
          multiline
        />
        {attachments && attachments.length > 0 && (
          <View>
            {attachments.map((attachment, index) => {
              if (attachment.type === "image") {
                return (
                  <View key={index} className="w-[50%] relative">
                    <View className="w-7 h-7 absolute -top-3 -right-3 z-10 bg-secondary-foreground flex-row justify-center items-center rounded-full">
                      <TouchableOpacity
                        onPress={() => clearAttachments()}
                        className="font-semibold"
                      >
                        <AntDesign name="close" size={15} color="black" />
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{ uri: attachment.uri }}
                      resizeMode="cover"
                      className=" h-24 rounded-lg"
                    />
                  </View>
                );
              } else if (attachment.type === "audio") {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => playAudio(attachment.uri)}
                    className="flex-row items-center gap-2 p-2 bg-gray-200 rounded-lg"
                  >
                    <AudioWaveForm
                      audioUri={attachment.uri}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                    />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        )}
        {/* Add media button */}
        <View className="flex-row justify-between items-center border-b pb-5 border-secondary-foreground my-3">
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Attach />
          </TouchableOpacity>

          <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
            {postComment.isPending ? (
              // {isLoading ? (
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

        {/* COMMENTS */}
        <View style={{ height: "90%", flex: 1 }}>
          {commentLoading ? (
            <Loader />
          ) : todoComments && todoComments.length > 0 ? (
            <FlatList
              data={todoComments}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <View
                  key={item._id}
                  className="flex-row items-start gap-3 mb-3"
                >
                  {/* Profile bubble */}
                  <View className="flex-row justify-center items-center w-10 h-10 rounded-full bg-secondary-foreground">
                    <Text>NA</Text>
                  </View>

                  {/* Comment details */}
                  <View className="flex-1">
                    <Text className="capitalize font-medium mb-1">
                      commenter name
                    </Text>

                    {/* Attachments */}
                    {item.attachments && item.attachments.length > 0 && (
                      <View className="flex-row flex-wrap gap-2 mb-2">
                        {item.attachments.map(
                          (att: attachmentType, index: number) => {
                            if (att.type === "photo" || att.type === "image") {
                              return (
                                <Image
                                  key={index}
                                  source={{ uri: att.url }}
                                  className="w-[80%] h-24 rounded-lg bg-slate-100"
                                  resizeMode="cover"
                                />
                              );
                            }

                            if (att?.type === "voice") {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => playAudio(att?.url)}
                                  className="flex-row items-center gap-2 p-2 bg-gray-200 rounded-lg"
                                >
                                  <AudioWaveForm
                                    audioUri={att?.url}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                  />
                                </TouchableOpacity>
                              );
                            }

                            if (att.type === "doc") {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() =>
                                    console.log("Download:", att.uri)
                                  }
                                  className="flex-row items-center gap-2 p-2 bg-gray-100 rounded-lg"
                                >
                                  <Text>📄</Text>
                                  <Text className="text-blue-600 underline">
                                    Download File
                                  </Text>
                                </TouchableOpacity>
                              );
                            }

                            return null;
                          }
                        )}
                      </View>
                    )}

                    {/* Comment text */}
                    <Text>{item.commenterText}</Text>
                  </View>
                </View>
              )}
            />
          ) : null}
        </View>
        {/* COMMENTS */}

        {error && <Text className="text-destructive text-ms">{error}</Text>}
        {/* </View> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
