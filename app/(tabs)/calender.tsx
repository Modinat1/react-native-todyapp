import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import WeekPicker from "@/components/WeekPicker";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const Calender = () => {
  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Upcoming</Text>
        <Search />
      </View>

      <WeekPicker />

      <View className="flex-row justify-between items-center my-3">
        <Text className="text-base font-medium text-black">
          Today. Wednesday
        </Text>
        <Text className="text-base font-medium text-primary">Reschedule</Text>
      </View>

      <View className="border-b border-border w-full my-3"></View>

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
            Masyla Website Project
          </Text>
        </View>
        <Feather
          name="more-horizontal"
          size={18}
          color="#767E8C"
          style={{ marginLeft: "auto" }}
        />
      </View>

      <View className="flex-row justify-between items-center mt-5">
        <View style={styles.iconText}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="red" />
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
          <MaterialCommunityIcons name="clock-outline" size={16} color="red" />
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
    </Container>
  );
};

export default Calender;

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
