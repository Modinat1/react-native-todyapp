import { useGetTodo, useUpdateTodoStatus } from "@/api/hooks/todo";
import {
  BagSvg,
  CalenderSvg,
  CommentSvg,
  FlagSvg,
  TimeSvg,
} from "@/assets/svgs/svg";
import { colors } from "@/colorSettings";
import Container from "@/components/Container";
import DatePicker from "@/components/DatePicker";
import MediaModal from "@/components/MediaModal";
import { formatTime, getThemeColor } from "@/lib/utils";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Comment from "./Comment";
import DeleteTodoModal from "./DeleteTodo";
import EditTodoModal from "./EditTodoModal";
import Loader from "./Loader";
import TimeModal from "./TimeModal";

interface ViewTodoModalProps {
  onClose: () => void;
  todoId: string;
}

const ViewTodoModal = ({ onClose, todoId }: ViewTodoModalProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { openSheet, closeSheet } = useBottomSheetStore();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const [openToolTip, setOpenToolTip] = useState(false);

  const { data, isLoading } = useGetTodo(todoId);
  const { mutateAsync: updateTodoStatus, isPending } =
    useUpdateTodoStatus(todoId);
  // console.log("data::::", JSON.stringify(data, null, 2));
  // console.log("todo::::", JSON.stringify(todo, null, 2));
  // console.log("todo Id::::", JSON.stringify(todo._id, null, 2));

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

  const handleUpdateTodoStatus = async () => {
    try {
      await updateTodoStatus({ status: "completed" });

      Toast.show({
        type: "success",
        text1: "Todo status updated successfully",
      });
    } catch (error: any) {
      console.log(error, "error updating todo status");

      const message = error?.message ?? "Error updating todo status";
      Toast.show({ type: "error", text1: "Error", text2: message });
    }
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
                borderColor: getThemeColor(
                  todoData?.theme || colors.primary.DEFAULT
                ),
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
                  backgroundColor: getThemeColor(
                    todoData?.theme || colors.primary.DEFAULT
                  ),
                }}
              />
            </View>

            <Text className="flex-1 text-lg font-medium text-black capitalize">
              {todoData?.todoTitle}
            </Text>
          </View>

          <Text className="text-secondary font-normal text-base leading-8">
            {todoData?.description}
          </Text>

          <View className="flex-row justify-between items-center">
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

            <View className="flex-row items-center gap-3">
              <TouchableOpacity onPress={() => setOpenEditModal(true)}>
                <AntDesign
                  name="edit"
                  size={20}
                  color={colors.primary.DEFAULT}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.error.DEFAULT}
                />
              </TouchableOpacity>
            </View>
          </View>

          {todoData?.status === "overdue" && (
            <Text className="text-destructive my-5">
              Complete your task, this task is overdue 🙄
            </Text>
          )}

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
                  setOpenTimeModal(true);
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
                }}
              >
                <FlagSvg
                  color={
                    activeIcon === "flag" ? colors.primary.DEFAULT : "#A0AAB8"
                  }
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOpenToolTip(!openToolTip)}>
              <Entypo name="dots-three-vertical" size={20} color="#A0AAB8" />
            </TouchableOpacity>
            {openToolTip && (
              <TouchableOpacity
                onPress={() => handleUpdateTodoStatus()}
                className="bg-white border-border border-4 absolute top-10 right-0 shadow-2xl rounded-md p-3 z-10"
              >
                {isPending ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.primary.DEFAULT}
                  />
                ) : (
                  <>
                    <Text className="text-secondary">Mark as completed</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <View className="w-full border-b border-[#E0E5ED] my-3"></View>

      {activeIcon === "comment" && (
        <Comment
          todoId={todoId}
          commentModalVisible={commentModalVisible}
          setCommentModalVisible={setCommentModalVisible}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <MediaModal
        todoId={todoId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <TimeModal
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
      />

      {openEditModal && todoData && (
        <EditTodoModal
          todo={todoData}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          onCloseViewTodoModal={onClose}
        />
      )}

      {openDeleteModal && todoData && (
        <DeleteTodoModal
          todo={todoData}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          onCloseViewTodoModal={onClose}
        />
      )}
    </Container>
  );
};

export default ViewTodoModal;
