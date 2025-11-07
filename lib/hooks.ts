import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { EmojiUsage } from "./types";

const EMOJI_STORAGE_KEY = "@emoji_usage";
const DEFAULT_EMOJIS = ["😊", "😂", "💪"];
// const DEFAULT_EMOJIS = ["😊", "😂", "😇", "🙌", "👋", "😨", "✌️", "💪"]

export const useEmojiTracker = () => {
  const [emojiUsage, setEmojiUsage] = useState<Record<string, EmojiUsage>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load emoji usage from storage
  useEffect(() => {
    loadEmojiUsage();
  }, []);

  const loadEmojiUsage = async () => {
    try {
      const stored = await AsyncStorage.getItem(EMOJI_STORAGE_KEY);
      if (stored) {
        setEmojiUsage(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading emoji usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEmojiUsage = async (usage: Record<string, EmojiUsage>) => {
    try {
      await AsyncStorage.setItem(EMOJI_STORAGE_KEY, JSON.stringify(usage));
    } catch (error) {
      console.error("Error saving emoji usage:", error);
    }
  };

  const trackEmoji = useCallback((emoji: string) => {
    setEmojiUsage((prev) => {
      const updated = {
        ...prev,
        [emoji]: {
          emoji,
          count: (prev[emoji]?.count || 0) + 1,
          lastUsed: Date.now(),
        },
      };
      saveEmojiUsage(updated);
      return updated;
    });
  }, []);

  const getMostUsedEmojis = useCallback(
    (limit: number = 8): string[] => {
      const sorted = Object.values(emojiUsage)
        .sort((a, b) => {
          // Sort by count first, then by recency
          if (b.count !== a.count) {
            return b.count - a.count;
          }
          return b.lastUsed - a.lastUsed;
        })
        .map((item) => item.emoji);

      // Combine most used with defaults, ensuring no duplicates
      const combined = [...new Set([...sorted, ...DEFAULT_EMOJIS])];
      return combined.slice(0, limit);
    },
    [emojiUsage]
  );

  const getRecentEmojis = useCallback(
    (limit: number = 8): string[] => {
      return Object.values(emojiUsage)
        .sort((a, b) => b.lastUsed - a.lastUsed)
        .map((item) => item.emoji)
        .slice(0, limit);
    },
    [emojiUsage]
  );

  return {
    trackEmoji,
    getMostUsedEmojis,
    getRecentEmojis,
    emojiUsage,
    isLoading,
  };
};
