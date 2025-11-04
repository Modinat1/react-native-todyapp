import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function WeekPicker() {
  const [selectedDate, setSelectedDate] = useState(7);

  const weekData = [
    { day: "M", date: 5 },
    { day: "T", date: 6 },
    { day: "W", date: 7 },
    { day: "T", date: 8 },
    { day: "F", date: 9 },
    { day: "S", date: 10 },
    { day: "S", date: 11 },
    { day: "M", date: 12 },
  ];

  const currentDay = new Date();
  const monthName = currentDay.toLocaleString("default", { month: "long" });
  const year = currentDay.getFullYear();
  const currentmonthYear = `${monthName}, ${year}`;

  return (
    <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 5 }}>
            {currentmonthYear}
          </Text>
          <AntDesign name="down" size={14} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{ color: "#18A999", fontWeight: "500" }}>Today</Text>
        </TouchableOpacity>
      </View>

      {/* Days */}
      <FlatList
        data={weekData}
        keyExtractor={(item) => item.date.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => {
          const isSelected = selectedDate === item.date;
          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(item.date)}
              style={{
                alignItems: "center",
                marginHorizontal: 6,
              }}
            >
              {/* Day label */}
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: isSelected ? "white" : "#777",
                  backgroundColor: isSelected ? "#18A999" : "transparent",
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                {item.day}
              </Text>

              {/* Date number */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: isSelected ? "white" : "#333",
                  backgroundColor: isSelected ? "#18A999" : "transparent",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Bottom border */}
      <View
        style={{
          height: 1,
          backgroundColor: "#eee",
          marginTop: 10,
        }}
      />
    </View>
  );
}
