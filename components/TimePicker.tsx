import { View } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";

interface TimeObject {
  hours: number;
  minutes: number;
}

interface TimePickerProps {
  openTimeModal: boolean;
  setOpenTimeModal: (open: boolean) => void;
  dueTime?: Date | string;
  setDueTime?: (dueTime: Date | string) => void;
}

const TimePicker = ({
  openTimeModal,
  setOpenTimeModal,
  dueTime,
  setDueTime,
}: TimePickerProps) => {
  const onConfirm = ({ hours, minutes }: TimeObject) => {
    setOpenTimeModal(false);

    const localTimeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setDueTime?.(localTimeString);
  };

  console.log("dueTime::::", dueTime);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TimePickerModal
        visible={openTimeModal}
        onDismiss={() => setOpenTimeModal(false)}
        onConfirm={onConfirm}
        // hours={hours}
        // minutes={dueTime?.minutes}
        label="Select time"
        animationType="fade"
        locale="en"
      />
    </View>
  );
};

export default TimePicker;

// import { colors } from "@/colorSettings";
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
// import { Platform, View } from "react-native";

// interface TimePickerProps {
//   openTimeModal: boolean;
//   setOpenTimeModal: (openTimeModal: boolean) => void;
//   dueTime?: Date;
//   setDueTime?: (dueTime: Date) => void;
//   accentColor?: string; // Add custom accent color prop
// }

// const TimePicker = ({
// openTimeModal,
// setOpenTimeModal,
// dueTime,
// setDueTime,
//   accentColor = colors.primary.DEFAULT, // Your app's primary color
// }: TimePickerProps) => {
//   const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
//     if (event.type === "set" && selectedTime) {
//       setDueTime?.(selectedTime);
//     }
//     console.log(selectedTime);
//     console.log(dueTime);
//     setOpenTimeModal(false);
//   };

//   return (
//     <View>
//       {openTimeModal && (
//         <DateTimePicker
//           value={dueTime ?? new Date()}
//           mode="time"
//           is24Hour={false}
//           display={Platform.OS === "ios" ? "spinner" : "clock"}
//           onChange={onChange}
//           // iOS specific styling
//           themeVariant="light" // or "dark"
//           accentColor="#24A19C"
//           // accentColor={accentColor} // Works on iOS
//           // Android specific styling
//           {...(Platform.OS === "android" && {
//             positiveButton: { label: "OK", textColor: accentColor },
//             negativeButton: { label: "Cancel", textColor: accentColor },
//           })}
//         />
//       )}
//     </View>
//   );
// };

// export default TimePicker;
