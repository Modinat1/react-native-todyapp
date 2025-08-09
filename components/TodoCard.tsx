import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TodoCardProps {
  title: string;
  color: string;
  createdAt: string;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, color, createdAt }) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { backgroundColor: color }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.footer}>
          <Text style={styles.subText}>Today</Text>
          <Text style={styles.subText}>{createdAt}</Text>
        </View>
      </View>
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
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

export default TodoCard;
