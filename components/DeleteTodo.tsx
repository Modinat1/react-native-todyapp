import { useDeleteTodo } from "@/api/hooks/todo";
import { colors } from "@/colorSettings";
import { Todo } from "@/lib/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface DeleteTodoModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: (openDeleteModal: boolean) => void;
  todo: Todo;
  onCloseViewTodoModal: () => void;
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
  todo,
  onCloseViewTodoModal,
}) => {
  const { mutateAsync, isPending } = useDeleteTodo(todo._id);

  const handleDeleteTodo = async () => {
    try {
      await mutateAsync();
      Toast.show({
        type: "success",
        text1: "Todo updated successfully!",
        visibilityTime: 2000,
      });
      setOpenDeleteModal(false);
      onCloseViewTodoModal();
    } catch (error: any) {
      console.error("Error updating todo:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.message || "Failed to update todo",
      });
    }
  };

  return (
    <Modal
      visible={openDeleteModal}
      transparent
      animationType="fade"
      onRequestClose={() => setOpenDeleteModal(false)}
    >
      {/* Overlay */}
      <View className="flex-1 bg-black/40 justify-center items-center">
        {/* <View className="flex-1 bg-black/40 justify-center items-center"> */}
        {/* Modal content */}
        <View className="bg-white w-[90%] rounded-2xl p-6 shadow-3xl">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold mb-3">Delete Todo</Text>
            <TouchableOpacity onPress={() => setOpenDeleteModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text>
            Are you sure you want to delete task {`"${todo.todoTitle}"`}?
          </Text>

          <TouchableOpacity
            disabled={isPending}
            onPress={handleDeleteTodo}
            className={`rounded-md py-3 mt-10 ${
              isPending ? "bg-gray-400" : "bg-primary"
            }`}
          >
            <Text className="text-center text-white font-medium">
              {isPending ? (
                <ActivityIndicator color={colors.primary.DEFAULT} />
              ) : (
                "Yes, Delete"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteTodoModal;
