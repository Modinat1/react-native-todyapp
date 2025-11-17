import { colors } from "@/colorSettings";
import { Todo } from "@/lib/types";
import { formatDate, getThemeColor } from "@/lib/utils";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditDateTime from "./EditDateTime";

interface UpcomingTodosProps {
  upcomingTodos: Todo[];
}

const UpcomingTodos: React.FC<UpcomingTodosProps> = ({ upcomingTodos }) => {
  const [openEditDateTimeModal, setOpenEditDateTimeModal] = useState(false);
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 2);

  const nextAfterDay = new Date(today);
  nextDay.setDate(today.getDate() + 2);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {upcomingTodos?.map((todo: Todo) => {
        return (
          <View key={todo._id}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: `${getThemeColor(todo.theme)}`,
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
                      backgroundColor: `${getThemeColor(todo.theme)}`,
                    }}
                  />
                </View>
                <Text className="text-base font-medium text-black">
                  {todo.todoTitle}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setOpenEditDateTimeModal(true)}>
                <Feather
                  name="more-horizontal"
                  size={18}
                  color="#767E8C"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mt-3">
              <View style={styles.iconText}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color={`${
                    todo.status === "overdue"
                      ? colors.error.DEFAULT
                      : todo.status === "pending"
                      ? "#eab308"
                      : colors.primary.DEFAULT
                  }`}
                />
                <Text
                  className={`${
                    todo.status === "overdue"
                      ? "text-destructive"
                      : todo.status === "pending"
                      ? "text-yellow-500"
                      : "text-primary"
                  } text-sm ml-2`}
                >
                  {formatDate(todo.createdAt)}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View style={styles.iconText}>
                  <Feather name="message-circle" size={14} color="#888" />
                  <Text style={styles.meta}>{todo.comments.length}</Text>
                </View>

                <View style={styles.iconText}>
                  <Feather name="repeat" size={14} color="#888" />
                  <Text style={styles.meta}>0</Text>
                </View>
              </View>
            </View>

            <View className="border-b border-border w-full my-3"></View>

            <Text className="text-secondary text-base font-normal">
              {formatDate(tomorrow)}
            </Text>
            <View className="border-b border-border w-full my-3"></View>
            <Text className="text-secondary text-base font-normal">
              {formatDate(nextDay)}
            </Text>
            <View className="border-b border-border w-full my-3"></View>
            <Text className="text-secondary text-base font-normal">
              {formatDate(nextAfterDay)}
            </Text>
            <View className="border-b border-border w-full my-3"></View>
            {/* ----------- */}
            {openEditDateTimeModal && (
              <EditDateTime
                openEditDateTimeModal={openEditDateTimeModal}
                setOpenEditDateTimeModal={setOpenEditDateTimeModal}
                todoId={todo._id}
              />
            )}
            {/* ----------- */}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default UpcomingTodos;

const styles = StyleSheet.create({
  empty: {
    padding: 20,
    alignItems: "center",
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  priorityText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  cardBody: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  meta: {
    color: "#666",
    fontSize: 12,
    marginLeft: 4,
  },
  date: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#666",
  },
});
