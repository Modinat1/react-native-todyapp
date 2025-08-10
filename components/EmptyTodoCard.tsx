import { PlusIcon } from "@/assets";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppStore } from "../store/store";

const EmptyTodoCard = ({ onPress }: { onPress: () => void }) => {
  const { selectedTheme } = useAppStore();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.wrapper}
    >
      <View style={[styles.header, { backgroundColor: selectedTheme.color }]} />
      <View style={styles.body}>
        <View style={styles.row}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedTheme.color,
              width: 24,
              height: 24,
              borderRadius: 6,
              shadowRadius: 4,
            }}
          >
            <PlusIcon width={15} height={15} />
          </View>

          <Text style={styles.title}>Tap plus to create a new task</Text>
        </View>
        <View className="border-b border-border my-5 w-full"></View>
        <View style={styles.footer}>
          <Text style={styles.subText}>Add your task</Text>
          <Text style={styles.subText}>Today · Mon 20 Jul 2022</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
    marginBottom: 20,
  },
  header: {
    height: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  body: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    fontSize: 12,
    color: "#94A3B8",
  },
});

export default EmptyTodoCard;
