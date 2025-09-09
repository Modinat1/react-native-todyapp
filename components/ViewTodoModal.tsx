import { useGetTodo } from "@/api/hooks/todo";
import {
  BagSvg,
  CalenderSvg,
  CommentSvg,
  FlagSvg,
  TimeSvg,
} from "@/assets/svgs/svg";
import { colors } from "@/colorSettings";
import Comment from "@/components/Comment";
import Container from "@/components/Container";
import DatePicker from "@/components/DatePicker";
import MediaModal from "@/components/MediaModal";
import TimePicker from "@/components/TimePicker";
import { Todo } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { useAppStore } from "@/store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Loader from "./Loader";

interface ViewTodoModalProps {
  onClose: () => void;
  todo: Todo;
}

const ViewTodoModal = ({ onClose, todo }: ViewTodoModalProps) => {
  const { openSheet, closeSheet } = useBottomSheetStore();
  const { selectedTheme } = useAppStore();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const { data, isLoading } = useGetTodo(todo._id);
  // console.log("data::::", JSON.stringify(data, null, 2));

  const todoData = data?.todo;

  const showDatePicker = () => {
    openSheet({
      snapPoints: ["90%"],
      content: (
        <DatePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  const showTimePicker = () => {
    openSheet({
      snapPoints: ["60%"],
      content: (
        <TimePicker
          visible={true}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  return (
    <Container>
      <View className="flex-row justify-between items-center mb-10">
        <Text className="text-xl font-semibold text-black ">Detail Task</Text>
        <AntDesign onPress={onClose} name="close" size={20} color="#A0AAB8" />
      </View>

      {isLoading ? (
        <Loader />
      ) : !data ? (
        <Text> Todo not found yet! </Text>
      ) : (
        <>
          <View className="flex-row items-center gap-3 mb-2">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: selectedTheme.color,
                borderRadius: 999,
                width: 20,
                height: 20,
                padding: 2,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: selectedTheme.color,
                }}
              />
            </View>

            <Text className="text-lg font-medium text-black">
              {todoData?.todoTitle}
            </Text>
          </View>

          <Text className="text-secondary font-normal text-sm leading-8">
            {todoData?.description}
          </Text>

          <View className="flex-row gap-3 items-center my-3">
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
              color="red"
            />
            <Text className="text-destructive font-xs">
              {formatTime(todoData?.createdAt)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-5 my-3">
              <TouchableOpacity
                onPress={() => {
                  setActiveIcon(activeIcon === "comment" ? null : "comment");
                }}
              >
                <CommentSvg
                  color={
                    activeIcon === "comment"
                      ? colors.primary.DEFAULT
                      : "#A0AAB8"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveIcon("bag")}>
                <BagSvg
                  color={
                    activeIcon === "bag" ? colors.primary.DEFAULT : "#A0AAB8"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActiveIcon("calender");
                  showDatePicker();
                }}
              >
                <CalenderSvg
                  color={
                    activeIcon === "calender"
                      ? colors.primary.DEFAULT
                      : "#A0AAB8"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActiveIcon("time");
                  showTimePicker();
                }}
              >
                <TimeSvg
                  color={
                    activeIcon === "time" ? colors.primary.DEFAULT : "#A0AAB8"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActiveIcon("flag");
                  // showTimePicker();
                }}
              >
                <FlagSvg
                  color={
                    activeIcon === "flag" ? colors.primary.DEFAULT : "#A0AAB8"
                  }
                />
              </TouchableOpacity>
            </View>
            <View>
              <Entypo name="dots-three-vertical" size={20} color="#A0AAB8" />
            </View>
          </View>
        </>
      )}

      <View className="w-full border-b border-[#E0E5ED] my-3"></View>

      {activeIcon === "comment" && (
        <Comment
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          todoId={todo._id}
        />
      )}

      <MediaModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
};

export default ViewTodoModal;
