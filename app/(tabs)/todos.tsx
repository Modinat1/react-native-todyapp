import { useGetTodos } from "@/api/hooks/todo";
import { PlusIcon, Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";

import { colors } from "@/colorSettings";
import Card from "@/components/Card";

import Loader from "@/components/Loader";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TodoList = () => {
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetTodos();

  const TodoData = data?.pages.flatMap((page) => page.todos) || [];
  // console.log("USER TODOS:::::::", JSON.stringify(data, null, 2));
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

      {hasNextPage && (
        <TouchableOpacity
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          <View className="mx-auto text-center">
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              <Text className="text-gray-500 font-semibold text-base">
                Load more
              </Text>
            )}
          </View>
        </TouchableOpacity>
      )}

      {isError && (
        <Text className="text-destructive text-center font-semibold text-base">
          {" "}
          Error fetching todos
        </Text>
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
