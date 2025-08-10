import { Flag2, PlusIcon, Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import { useAppStore } from "@/store/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TodoList = () => {
  const { todos } = useAppStore();

  if (todos.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No todos yet 👀</Text>
      </View>
    );
  }

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        {/* <AntDesign name="left" size={24} color="black" /> */}
        <Text className="text-black text-xl font-bold"> Inbox</Text>
        <Search />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        // contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            {/* Top Bar */}
            <View
              style={[
                styles.topBar,
                { backgroundColor: item.color || "#18A999" },
              ]}
            >
              <Flag2 />
              <Text style={styles.priorityText}>Priority task {index + 1}</Text>
              <Feather
                name="more-horizontal"
                size={18}
                color="#fff"
                style={{ marginLeft: "auto" }}
              />
            </View>

            {/* Body */}
            <View style={styles.cardBody}>
              <View style={styles.titleRow}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: item.color,
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
                      backgroundColor: item.color,
                    }}
                  />
                </View>

                <Text style={styles.title}>{item.title}</Text>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                <View style={styles.iconText}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color="red"
                  />
                  <Text style={styles.time}>08.30 PM</Text>
                </View>

                <View style={styles.iconText}>
                  <Feather name="message-circle" size={14} color="#888" />
                  <Text style={styles.meta}>1</Text>
                </View>

                <View style={styles.iconText}>
                  <Feather name="repeat" size={14} color="#888" />
                  <Text style={styles.meta}>2</Text>
                </View>

                <Text style={styles.date}>
                  {new Date(Number(item.id)).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View className="flex justify-center items-center bg-primary w-12 h-12 rounded-full">
        <PlusIcon />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#18A999", // fallback color
          width: 48,
          height: 48,
          borderRadius: 999,
          elevation: 5, // shadow on Android
          shadowColor: "#000", // shadow on iOS
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <PlusIcon />
      </View>
    </Container>
  );
};

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

export default TodoList;
