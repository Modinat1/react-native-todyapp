import { useUpdateTodo } from "@/api/hooks/todo";
import { colors } from "@/colorSettings";
import { Todo } from "@/lib/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface EditTodoModalProps {
  openEditModal: boolean;
  setOpenEditModal: (openEditModal: boolean) => void;
  todo: Todo;
  onCloseViewTodoModal: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  openEditModal,
  setOpenEditModal,
  todo,
  onCloseViewTodoModal,
}) => {
  const { mutateAsync, isPending } = useUpdateTodo(todo?._id);
  console.log(todo, "todo::");

  const [title, setTitle] = useState(todo?.todoTitle || "");
  const [description, setDescription] = useState(todo?.description || "");

  useEffect(() => {
    if (todo) {
      setTitle(todo?.todoTitle || "");
      setDescription(todo?.description || "");
    }
  }, [todo, openEditModal]);

  const handleUpdateTodo = async () => {
    try {
      await mutateAsync({
        todoTitle: title,
        description,
      });
      Toast.show({
        type: "success",
        text1: "Todo updated successfully!",
        visibilityTime: 2000,
      });
      setOpenEditModal(false);
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
      visible={openEditModal}
      transparent
      animationType="fade"
      onRequestClose={() => setOpenEditModal(false)}
    >
      {/* Overlay */}
      <View className="flex-1 bg-black/40 justify-center items-center">
        {/* Modal content */}
        <View className="w-[90%] rounded-2xl p-6 shadow-3xl">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold mb-3">Edit Todo</Text>
            <TouchableOpacity onPress={() => setOpenEditModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TextInput
            value={title}
            onChangeText={setTitle}
            autoCapitalize="none"
            keyboardType="default"
            className="bg-secondary-foreground border border-border rounded-[6px] p-3 my-3"
            placeholder="Todo title"
            placeholderTextColor="#A9B0C5"
          />

          <TextInput
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            keyboardType="default"
            className="bg-secondary-foreground border border-border rounded-[6px] p-3"
            placeholder="Todo description"
            placeholderTextColor="#A9B0C5"
            multiline
          />

          <TouchableOpacity
            disabled={isPending}
            onPress={handleUpdateTodo}
            className={`rounded-md py-3 mt-10 ${
              isPending ? "bg-gray-400" : "bg-primary"
            }`}
          >
            <Text className="text-center text-white font-medium">
              {isPending ? (
                <ActivityIndicator color={colors.primary.DEFAULT} />
              ) : (
                "Save Changes"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditTodoModal;
