import { Todo } from "@/lib/types";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const UpcomingTodos = ({ upcomingTodos }: Todo) => {
  return (
    <View>
      {(!upcomingTodos || upcomingTodos.length < 0) && (
          <Text>No upcoming Todos yet!</Text>
        ) && (
          <>
            {/* -------another upcoming */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#18A999",
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
                      backgroundColor: "#18A999",
                    }}
                  />
                </View>
                <Text className="text-base font-medium text-black">
                  Medical Design System
                </Text>
              </View>
              <Feather
                name="more-horizontal"
                size={18}
                color="#767E8C"
                style={{ marginLeft: "auto" }}
              />
            </View>

            <View className="flex-row justify-between items-center mt-3">
              <View style={styles.iconText}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="red"
                />
                <Text style={styles.time}>08.30 PM</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View style={styles.iconText}>
                  <Feather name="message-circle" size={14} color="#888" />
                  <Text style={styles.meta}>0</Text>
                </View>

                <View style={styles.iconText}>
                  <Feather name="repeat" size={14} color="#888" />
                  <Text style={styles.meta}>0</Text>
                </View>
              </View>
            </View>

            <View className="border-b border-border w-full my-3"></View>

            <Text className="text-secondary text-base font-normal">
              8, Apr, 2022. Thurday
            </Text>
            <View className="border-b border-border w-full my-3"></View>
            <Text className="text-secondary text-base font-normal">
              9, Apr, 2022. Friday
            </Text>
            <View className="border-b border-border w-full my-3"></View>
            <Text className="text-secondary text-base font-normal">
              10, Apr, 2022. Friday
            </Text>
            <View className="border-b border-border w-full my-3"></View>

            {/* -------another upcoming */}
          </>
        )}
    </View>
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
  time: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
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
