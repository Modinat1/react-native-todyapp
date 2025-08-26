import { CarIcon, Cloud, Reserve, Sun, Timer } from "@/assets";
import { colors } from "@/colorSettings";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Button from "./Button";
import Container from "./Container";

type DatePickerProps = {
  visible: boolean;
  onClose: () => void;
};

const Items = [
  {
    id: "1",
    title: "Today",
    value: "4, Apr 2022",
    icon: <Sun />,
  },
  {
    id: "2",
    title: "Tomorrow",
    value: "Sat",
    icon: <Cloud />,
  },
  {
    id: "3",
    title: "This weekend",
    value: "Wed",
    icon: <CarIcon />,
  },
  {
    id: "4",
    title: "Next weekend",
    value: "10, Apr 2022",
    icon: <Reserve />,
  },
];

const DatePicker = ({ visible, onClose }: DatePickerProps) => {
  const [selected, setSelected] = useState("");

  console.log("SELECTED DATE", selected);

  return (
    <Container>
      <View>
        {Items.map((item) => {
          return (
            <View
              key={item.id}
              className="flex-row justify-between items-center "
            >
              <View className="flex-row gap-3 items-center mb-2">
                {item.icon}
                <Text className="text-base font-normal text-black">
                  {item.title}
                </Text>
              </View>
              <Text className="text-base font-normal text-secondary">
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="w-full border-b border-[#E0E5ED] my-5"></View>

      <View>
        <Calendar
          // Initially visible month
          current={new Date().toISOString().split("T")[0]}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: colors.primary.DEFAULT,
              selectedTextColor: "#fff",
            },
          }}
          theme={{
            backgroundColor: "#fff",
            calendarBackground: "#fff",
            textSectionTitleColor: "#4A4A4A",
            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#2E86DE",
            selectedDayTextColor: "#ffffff",
            todayTextColor: colors.primary.DEFAULT,
            dayTextColor: "#4A4A4A",
            textDisabledColor: "#d9e1e8",
            arrowColor: colors.primary.DEFAULT,
            monthTextColor: "#4A4A4A",
            indicatorColor: "#2E86DE",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>

      <View className="flex-row justify-between items-center gap-3 mt-10">
        <Button
          variant="ghost"
          className="bg-[#F3F5F9] flex-1 flex-row gap-3 items-center"
        >
          <AntDesign name="plus" size={24} color={colors.primary.DEFAULT} />
          <Text className="text-primary font-medium">Add Time</Text>
        </Button>
        <Button className="flex-1 flex-row gap-3 items-center">
          <Timer />
          <Text className="text-white font-medium">Reschedule</Text>
        </Button>
      </View>
    </Container>
  );
};

export default DatePicker;
