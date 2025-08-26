import { CalenderIcon, ClockIcon, FlagIcon, SendIcon } from "@/assets";
import Container from "@/components/Container";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { useAppStore } from "@/store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ViewTodo = () => {
  const { id } = useLocalSearchParams();
  const { openSheet, closeSheet } = useBottomSheetStore();
  const { selectedTheme } = useAppStore();
  const [task, setTask] = useState("");
  // const [isDone, setIsDone] = useState(false);
  const [description, setDescription] = useState("");
  // const [error, setError] = useState<string | null>(null);

  console.log("id:::::::::", id);

  const showDatePicker = () => {
    openSheet({
      snapPoints: ["90%"],
      content: (
        <DatePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  const showTimePicker = () => {
    openSheet({
      snapPoints: ["60%"],
      content: (
        <TimePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  return (
    <Container>
      <Text className="text-xl font-semibold text-black nb-5">Detail Task</Text>

      <View className="flex-row items-center gap-3 mb-2">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: selectedTheme.color,
            borderRadius: 999,
            width: 20,
            height: 20,
            padding: 2,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: selectedTheme.color,
            }}
          />
        </View>

        <Text className="text-lg font-medium text-black">
          Masyla Website Project
        </Text>
      </View>

      <Text className="text-secondary font-normal text-sm">
        One of the website projects in the field of digital services, located in
        california.
      </Text>

      <View className="flex-row gap-3 items-center my-3">
        <MaterialCommunityIcons name="clock-outline" size={16} color="red" />
        <Text className="text-destructive font-xs">08.30 PM</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.overlay}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          {/* Task input */}
          <TextInput
            placeholder="eg: Meeting with client"
            value={task}
            onChangeText={setTask}
            style={styles.input}
            placeholderTextColor="#A9B0C5"
          />
          {/* Description */}
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#A9B0C5"
            multiline
          />
          {/* Add button */}
          <View className="flex-row justify-between items-center border-b pb-5 border-secondary-foreground">
            <View className="flex-row items-center gap-5">
              {/* <TodoListIcon /> */}
              <TouchableOpacity onPress={showDatePicker}>
                <CalenderIcon />
              </TouchableOpacity>

              <TouchableOpacity onPress={showTimePicker}>
                <ClockIcon />
              </TouchableOpacity>
              <FlagIcon />
            </View>

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
    </Container>
  );
};

export default ViewTodo;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  emojiButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  addButton: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 12,
  },
});
