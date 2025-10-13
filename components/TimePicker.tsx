import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View } from "react-native";

type TimePickerProps = {
  visible: boolean;
  onClose: () => void;
};

const TimePicker = ({ visible, onClose }: TimePickerProps) => {
  const [time, setTime] = useState(new Date());

  console.log("TIME:::::::", time);

  const onChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={false}
        display="clock" // This gives the circular clock UI
        onChange={onChange}
        // accentColor="#ff6347"
      />
    </View>
  );
};

export default TimePicker;

// components/TimePicker.tsx

// import { colors } from "@/colorSettings";
// import { useState } from "react";
// import { View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// type TimePickerProps = {
//   visible: boolean;
//   onClose: () => void;
//   onConfirm?: (time: Date) => void;
//   accentColor?: string;
// };

// const TimePicker = ({
//   visible,
//   onClose,
//   onConfirm,
//   accentColor = "#f97316", // default orange accent
// }: TimePickerProps) => {
//   const [selectedTime, setSelectedTime] = useState(new Date());

//   const handleConfirm = (time: Date) => {
//     setSelectedTime(time);
//     onConfirm?.(time);
//     onClose();
//   };

//   console.log("selcted time:::::::::", selectedTime);

//   return (
//     <View>
//       <DateTimePickerModal
//         isVisible={visible}
//         mode="time"
//         date={selectedTime}
//         is24Hour={false}
//         onConfirm={handleConfirm}
//         onCancel={onClose}
//         confirmTextIOS="Confirm"
//         cancelTextIOS="Cancel"
//         buttonTextColorIOS={accentColor}
//         accentColor={colors.primary.DEFAULT}
//         display="clock"
//         themeVariant={colors.primary.DEFAULT}
//       />
//     </View>
//   );
// };

// export default TimePicker;
