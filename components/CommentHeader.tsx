import { Attach, SendIcon } from "@/assets";
import { colors } from "@/colorSettings";
import { useEmojiTracker } from "@/lib/hooks";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmojiPicker, { type EmojiType } from "rn-emoji-keyboard";
import AttachmentPreviewer from "./AttachmentPreviewer";

interface CommentHeaderProps {
  localComment: string;
  setLocalComment: (text: string) => void;
  attachments: any[];
  clearAttachments: (id: string) => void;
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  todoId: string;
  todoComments: any[];
  handleSubmit: () => void;
  isLoading: boolean;
  postComment: { isPending: boolean };
}

const CommentHeaderComponent = ({
  localComment,
  setLocalComment,
  attachments,
  clearAttachments,
  setModalVisible,
  modalVisible,
  todoId,
  todoComments,
  handleSubmit,
  isLoading,
  postComment,
}: CommentHeaderProps) => {
  const { trackEmoji, getMostUsedEmojis } = useEmojiTracker();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const quickEmojis = getMostUsedEmojis(8);

  const handleEmojiPress = (emoji: string) => {
    setLocalComment(localComment + emoji);
    trackEmoji(emoji);
  };

  const handleEmojiSelect = (emoji: EmojiType) => {
    setLocalComment(localComment + emoji.emoji);
    trackEmoji(emoji.emoji);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Input */}
      <BottomSheetTextInput
        placeholder="Enter comment..."
        value={localComment}
        onChangeText={setLocalComment}
        style={styles.input}
        placeholderTextColor="#A9B0C5"
        multiline
      />

      {/* Attachments */}
      {attachments.length > 0 && (
        <AttachmentPreviewer
          attachments={attachments}
          onRemove={() => clearAttachments(todoId)}
        />
      )}

      {/* Actions (attach + send + emoji) */}
      <View style={styles.actionRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Attach />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsEmojiPickerOpen(true)}
            style={styles.emojiPickerButton}
          >
            <Text style={styles.emojiPickerIcon}>😊</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity disabled={isLoading} onPress={handleSubmit}>
          {postComment.isPending ? (
            <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
          ) : (
            <SendIcon />
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Access Emojis (Most Used) */}
      <View style={styles.quickEmojiContainer}>
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

      {/* Comment count */}
      {todoComments.length > 0 && (
        <Text style={styles.commentsTitle}>
          Comments ({todoComments.length})
        </Text>
      )}
    </View>
  );
};

const CommentHeader = React.memo(CommentHeaderComponent);
CommentHeader.displayName = "CommentHeader";

export default CommentHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 16,
    flexShrink: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 40,
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
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  emojiPickerButton: {
    padding: 4,
  },
  emojiPickerIcon: {
    fontSize: 18,
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
  },
  emojiButton: {
    padding: 2,
  },
  emoji: {
    fontSize: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
    marginTop: 8,
  },
});
