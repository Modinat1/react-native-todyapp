import { colors } from "@/colorSettings";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

type DatePickerProps = {
  visible: boolean;
  onClose: () => void;
};

const DatePicker = ({ visible, onClose }: DatePickerProps) => {
  const [selected, setSelected] = useState("");

  console.log("SELECTED DATE", selected);

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default DatePicker;
