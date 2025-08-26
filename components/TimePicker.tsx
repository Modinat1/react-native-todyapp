import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View } from "react-native";

type TimePickerProps = {
  visible: boolean;
  onClose: () => void;
};

const TimePicker = ({ visible, onClose }: TimePickerProps) => {
  const [time, setTime] = useState(new Date());
  // const [show, setShow] = useState(false);

  console.log("TIME:::::::", time);

  const onChange = (event: any, selectedTime?: Date) => {
    // setShow(Platform.OS === "ios"); // iOS stays open until closed manually
    if (selectedTime) {
      setTime(selectedTime); // Save selected time
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      {/* <Button title="Pick a Time" onPress={() => setShow(true)} /> */}
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={false}
        display="clock" // This gives the circular clock UI
        onChange={onChange}
      />
    </View>
  );
};

export default TimePicker;
