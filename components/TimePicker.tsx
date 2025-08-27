import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
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
      />
    </View>
  );
};

export default TimePicker;
