import { PlusIcon, Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
// import { useAppStore } from "@/store/store";
import { useGetTodos } from "@/api/hooks/todo";
import { colors } from "@/colorSettings";
import Card from "@/components/Card";
import { ActivityIndicator, Text, View } from "react-native";

const TodoList = () => {
  const { data, isLoading } = useGetTodos();
  // console.log("TODOS AGAIN:::::::", JSON.stringify(data, null, 2));

  const TodoData = data?.todos || [];
  // const { todos } = useAppStore();

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Inbox</Text>
        <Search />
      </View>

      {isLoading ? (
        <View className="justify-center items-center h-screen">
          <ActivityIndicator color={colors.primary.DEFAULT} />
          <Text className="text-primary font-medium text-sm">Loading...</Text>
        </View>
      ) : TodoData?.length === 0 ? (
        <View className="justify-center items-center h-screen">
          <Text className="text-gray-500 font-medium text-base">
            No todos yet 👀
          </Text>
        </View>
      ) : (
        <Card data={TodoData} />
      )}

      <View className="flex justify-center items-center bg-primary w-12 h-12 rounded-full">
        <PlusIcon />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#18A999",
          width: 48,
          height: 48,
          borderRadius: 999,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <PlusIcon />
      </View>
    </Container>
  );
};

export default TodoList;
