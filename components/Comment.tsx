import { useGetComments, usePostComment } from "@/api/hooks/comment";
import { attachmentType } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import useAuthStore from "@/store/features/useAuthStore";
import useCommentStore from "@/store/features/useCommentStore";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Audio } from "expo-av";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import AudioWaveForm from "./AudioWaveForm";
import CommentHeader from "./CommentHeader";
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
  const {
    getAttachments,
    clearAttachments,
    getCommenterText,
    setCommenterText,
  } = useCommentStore();

  const attachments = getAttachments(todoId);
  const comment = getCommenterText(todoId) || "";

  const [isLoading, setIsLoading] = useState(false);
  const { data: comments, isLoading: commentLoading } = useGetComments(todoId);

  const [localComment, setLocalComment] = useState(comment || "");
  const error = "";
  const postComment = usePostComment(todoId);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const todoAttachments = getAttachments(todoId);
      const token = useAuthStore.getState().token || "";

      await postComment.mutateAsync({
        todoId,
        commenterText: localComment,
        attachments: todoAttachments,
        token,
      });

      // Reset
      clearAttachments(todoId);
      setCommenterText(todoId, "");
      setLocalComment("");

      setCommentModalVisible(false);

      Toast.show({ type: "success", text1: "Comment added successfully" });
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.message ?? "Error posting comment";
      Toast.show({ type: "error", text1: "Error", text2: message });
    } finally {
      setIsLoading(false);
    }
  };

  const todoComments = comments?.comments || [];

  // console.log(JSON.stringify(todoComments, null, 2), "comments::::::::");

  const playAudio = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  if (commentLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <>
      <BottomSheetFlatList
        data={todoComments}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 10 }}
        ListHeaderComponent={
          <CommentHeader
            localComment={localComment}
            setLocalComment={setLocalComment}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            todoId={todoId}
            todoComments={todoComments}
            attachments={attachments}
            clearAttachments={clearAttachments}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            postComment={postComment}
          />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {getInitials(item?.commenterId?.userName || "User")}
              </Text>
            </View>

            <View style={styles.commentContent}>
              <Text style={styles.commenterName}>
                {item?.commenterId?.userName}
              </Text>

              {item.attachments && item.attachments.length > 0 && (
                <View style={styles.attachmentsContainer}>
                  {item.attachments.map(
                    (att: attachmentType, index: number) => {
                      if (att.type === "photo" || att.type === "image") {
                        return (
                          <Image
                            key={index}
                            source={{ uri: att.url }}
                            style={styles.attachmentImage}
                            resizeMode="cover"
                          />
                        );
                      }

                      if (att?.type === "voice") {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => playAudio(att?.url)}
                            style={styles.voiceAttachment}
                          >
                            <AudioWaveForm audioUri={att?.url} />
                          </TouchableOpacity>
                        );
                      }

                      if (att.type === "doc") {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => console.log("Download:", att.uri)}
                            style={styles.docAttachment}
                          >
                            <Text>📄</Text>
                            <Text style={styles.downloadText}>
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

              <Text style={styles.commentText}>{item.commenterText}</Text>
            </View>
          </View>
        )}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E5ED",
    paddingBottom: 20,
    marginVertical: 12,
  },
  emojiContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 16,
  },
  emoji: {
    fontSize: 24,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
  },
  commentItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "500",
  },
  commentContent: {
    flex: 1,
  },
  commenterName: {
    textTransform: "capitalize",
    fontWeight: "500",
    marginBottom: 4,
    fontSize: 14,
  },
  attachmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  attachmentImage: {
    width: "80%",
    height: 96,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  voiceAttachment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },
  docAttachment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  downloadText: {
    color: "#2563EB",
    textDecorationLine: "underline",
  },
  commentText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    marginTop: 8,
  },
});
