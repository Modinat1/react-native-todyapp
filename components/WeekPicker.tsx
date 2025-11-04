import { months } from "@/lib/data";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DropDown from "./DropDown";

interface WeekPickerProps {
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
  selectedMonth: number;
  selectedYear: number;
  todoData: { dueDate: string }[];
}
export default function WeekPicker({
  setShowDropdown,
  showDropdown,
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  todoData,
}: WeekPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekData, setWeekData] = useState<
    { day: string; date: number; fullDate: Date }[]
  >([]);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
    const days = weekDays.map((day, index) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: d.getDate(),
        fullDate: d,
      };
    });

    setWeekData(days);
  }, []);

  const currentDate = new Date();
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
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
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 5 }}>
            {selectedMonth != null && selectedYear
              ? `${months[selectedMonth]}, ${selectedYear}`
              : currentmonthYear}
          </Text>

          <AntDesign name="down" size={14} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedDate(new Date())}>
          <Text style={{ color: "#18A999", fontWeight: "500" }}>Today</Text>
        </TouchableOpacity>
      </View>

      {/* Days */}
      <FlatList
        data={weekData}
        keyExtractor={(item) => item.fullDate.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => {
          const isSelected = isSameDay(selectedDate, item.fullDate);
          const isToday = isSameDay(currentDate, item.fullDate);
          const active = isSelected || isToday;

          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(item.fullDate)}
              style={{
                alignItems: "center",
                marginHorizontal: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: active ? "white" : "#777",
                  backgroundColor: active ? "#18A999" : "transparent",
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                {item.day}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: active ? "white" : "#333",
                  backgroundColor: active ? "#18A999" : "transparent",
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

      <View
        style={{
          height: 1,
          backgroundColor: "#eee",
          marginTop: 10,
        }}
      />
      <DropDown
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
        todoData={todoData}
      />
    </View>
  );
}
