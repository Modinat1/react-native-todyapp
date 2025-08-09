import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppStore } from "../store/store";

type Theme = {
  id: number;
  color: string;
};

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const { selectedTheme, setSelectedTheme } = useAppStore();
  const isSelected = selectedTheme.id === theme.id;

  return (
    <TouchableOpacity
      onPress={() => setSelectedTheme(theme)}
      style={styles.cardWrapper}
      activeOpacity={0.8}
    >
      <View style={{ position: "relative" }}>
        {isSelected && (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        )}
        <View style={[styles.header, { backgroundColor: theme.color }]} />
      </View>

      <View style={styles.body}>
        <View style={styles.avatar} />
        <View style={styles.textLines}>
          <View style={styles.line} />
          <View style={[styles.line, { width: "85%" }]} />
          <View style={[styles.line, { width: "70%" }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "visible",
    elevation: 2,
  },
  header: {
    height: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  checkCircle: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#18A999",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 3,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
  },
  textLines: {
    flex: 1,
    justifyContent: "space-around",
  },
  line: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    marginBottom: 6,
    width: "100%",
  },
});

export default ThemeCard;
