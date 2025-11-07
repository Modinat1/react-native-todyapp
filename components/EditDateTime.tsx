import { useUpdateTodo } from "@/api/hooks/todo";
import { Timer } from "@/assets";
import { colors } from "@/colorSettings";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { TimePickerModal } from "react-native-paper-dates";
import Toast from "react-native-toast-message";
import Button from "./Button";

interface TimeObject {
  hours: number;
  minutes: number;
}

interface EditDateTimeProps {
  openEditDateTimeModal: boolean;
  setOpenEditDateTimeModal: (openEditDateTimeModal: boolean) => void;
  todoId: string;
}

const EditDateTime = ({
  openEditDateTimeModal,
  setOpenEditDateTimeModal,
  todoId,
}: EditDateTimeProps) => {
  const { mutateAsync, isPending } = useUpdateTodo(todoId);

  const [selected, setSelected] = useState("");
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const onConfirm = ({ hours, minutes }: TimeObject) => {
    setOpenTimeModal(false);
    const newDueTime = new Date();
    newDueTime.setHours(hours, minutes, 0, 0);
    setDueTime(newDueTime);
  };

  const handleUpdateTodo = async () => {
    if (!selected || !dueTime) {
      Toast.show({
        type: "error",
        text1: "Missing date or time",
        text2: "Please select both a date and time before scheduling.",
      });
      return;
    }

    try {
      await mutateAsync({
        dueDate: selected,
        dueTime,
      });

      Toast.show({
        type: "success",
        text1: "Task rescheduled successfully!",
        visibilityTime: 2000,
      });

      setOpenEditDateTimeModal(false);
    } catch (error: any) {
      console.error("Error rescheduling todo:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "Failed to reschedule todo",
      });
    }
  };

  return (
    <Modal
      visible={openEditDateTimeModal}
      transparent
      animationType="fade"
      onRequestClose={() => setOpenEditDateTimeModal(false)}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        {/* Modal content */}
        <View className="bg-white w-[90%] rounded-2xl shadow-3xl p-4">
          {/* Header */}
          <View className="relative items-center mb-3">
            <Text className="text-lg text-center font-semibold">
              Reschedule Task
            </Text>
            <TouchableOpacity
              className="absolute right-0"
              onPress={() => setOpenEditDateTimeModal(false)}
            >
              <AntDesign name="close" size={22} color="black" />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
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
              calendarBackground: "#fff",
              todayTextColor: colors.primary.DEFAULT,
              arrowColor: colors.primary.DEFAULT,
              monthTextColor: "#4A4A4A",
            }}
          />

          {/* selected date & time */}
          <View className="items-center my-4">
            {selected && (
              <Text className="text-gray-700 font-medium">
                📅 Selected Date:{" "}
                <Text className="text-primary">{selected}</Text>
              </Text>
            )}
            {dueTime && (
              <Text className="text-gray-700 font-medium mt-1">
                ⏰ Selected Time:{" "}
                <Text className="text-primary">
                  {dueTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Text>
            )}
          </View>

          {/* Actions */}
          {selected && !dueTime && (
            <Button
              onPress={() => setOpenTimeModal(true)}
              variant="ghost"
              className="bg-primary flex-row gap-3 items-center mb-5"
            >
              <AntDesign name="plus" size={22} color="#ffffff" />
              <Text className="text-white font-medium">Add Time</Text>
            </Button>
          )}

          {selected && dueTime && (
            <Button
              onPress={handleUpdateTodo}
              className="bg-primary flex-row gap-3 items-center mb-5"
            >
              {isPending ? (
                <ActivityIndicator size={18} color="#fff" />
              ) : (
                <>
                  <Timer />
                  <Text className="text-white font-medium">Schedule</Text>
                </>
              )}
            </Button>
          )}

          {!selected && (
            <Text className="text-gray-500 text-center mb-5">
              Please select a date to continue.
            </Text>
          )}
        </View>
      </View>

      {openTimeModal && (
        <TimePickerModal
          visible={openTimeModal}
          onDismiss={() => setOpenTimeModal(false)}
          onConfirm={onConfirm}
          label="Select time"
          animationType="fade"
          locale="en"
        />
      )}
    </Modal>
  );
};

export default EditDateTime;
