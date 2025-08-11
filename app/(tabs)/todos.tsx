import { useGetTodos } from "@/api/hooks/todo";
import { PlusIcon, Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
// import { useGetUserTodos } from "@/api/hooks/todo";
import { colors } from "@/colorSettings";
import Card from "@/components/Card";
// import useAuthStore from "@/store/features/useAuthStore";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TodoList = () => {
  const router = useRouter();
  // const { userId } = useAuthStore();
  const { data, isLoading } = useGetTodos();
  // const { data, isLoading } = useGetUserTodos(userId ?? 0);
  // console.log("USER TODOS:::::::", JSON.stringify(data, null, 2));

  const TodoData = data?.todos || [];
  // const { todos } = useAppStore();
  // const sortedTodos = TodoData ? [...TodoData].sort((a, b) => b.id - a.id) : [];
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
        // <Card data={sortedTodos} />
      )}

      <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
        <View
          style={{
            position: "fixed",
            bottom: 130,
            left: 250,
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
      </TouchableOpacity>
    </Container>
  );
};

export default TodoList;
