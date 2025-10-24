import { CarIcon, Cloud, Reserve, Sun, Timer } from "@/assets";
import { colors } from "@/colorSettings";
import { formatDate } from "@/lib/utils";
// import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Button from "./Button";
import Container from "./Container";
// import TimePicker from "./TimePicker";

type DatePickerProps = {
  visible: boolean;
  onClose: () => void;
  onSelectedDueDate?: (date: string) => void;
};

const DatePicker = ({
  visible,
  onClose,
  onSelectedDueDate,
}: DatePickerProps) => {
  const [selected, setSelected] = useState("");
  // const { openTimeSheet, closeTimeSheet } = useBottomSheetStore();

  console.log("SELECTED DATE", selected);

  const Items = useMemo(() => {
    const today = new Date();

    // Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // This weekend (Saturday)
    const thisWeekend = new Date(today);
    const day = today.getDay();
    const saturdayOffset = day <= 6 ? 6 - day : 0;
    thisWeekend.setDate(today.getDate() + saturdayOffset);

    // Next weekend (next Saturday)
    const nextWeekend = new Date(thisWeekend);
    nextWeekend.setDate(thisWeekend.getDate() + 7);

    return [
      {
        id: "1",
        title: "Today",
        value: formatDate(today),
        icon: <Sun />,
      },
      {
        id: "2",
        title: "Tomorrow",
        value: formatDate(tomorrow),
        icon: <Cloud />,
      },
      {
        id: "3",
        title: "This weekend",
        value: formatDate(thisWeekend),
        icon: <CarIcon />,
      },
      {
        id: "4",
        title: "Next weekend",
        value: formatDate(nextWeekend),
        icon: <Reserve />,
      },
    ];
  }, []);

  // const showTimePicker = () => {
  //   openTimeSheet({
  //     timeSnapPoints: ["60%"],
  //     timeContent: (
  //       <TimePicker
  //         visible={true}
  //         onClose={() => {
  //           closeTimeSheet();
  //         }}
  //       />
  //     ),
  //   });
  // };

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
            onSelectedDueDate?.(day.dateString);
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

      <Button
        className="w-[80%] flex-row justify-center mx-auto gap-3 items-center mt-10"
        onPress={onClose}
      >
        <Timer />
        <Text className="text-white font-medium">Schedule</Text>
      </Button>

      {/* 
      <View className="flex-row justify-between items-center gap-3 mt-10">
        <Button
          onPress={showTimePicker}
          variant="ghost"
          className="bg-[#F3F5F9] flex-1 flex-row gap-3 items-center"
        >
          <AntDesign name="plus" size={24} color={colors.primary.DEFAULT} />
          <Text className="text-primary font-medium">Add Time</Text>
        </Button>
        <Button
          className="flex-1 flex-row gap-3 items-center"
          // onPress={onClose}
        >
          <Timer />
          <Text className="text-white font-medium">Schedule</Text>
        </Button>
      </View> */}
    </Container>
  );
};

export default DatePicker;
