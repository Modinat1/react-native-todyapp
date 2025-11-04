import { useGetTodos } from "@/api/hooks/todo";
import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import UpcomingTodos from "@/components/UpcomingTodos";
import WeekPicker from "@/components/WeekPicker";
import { Text, View } from "react-native";

const Calender = () => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const currentDayIndex = new Date().getDay() - 1;
  const currentDayText = weekDays[currentDayIndex];

  const { data, isLoading: upComingTodoIsLoading } = useGetTodos();

  const TodoData = data?.todos || [];

  const currentDay = new Date();

  const upcomingTodos = TodoData?.filter((todo) => {
    const dueDate = new Date(todo?.dueDate);

    return (
      dueDate?.getFullYear() === currentDay.getFullYear() &&
      dueDate?.getMonth() === currentDay.getMonth() &&
      dueDate?.getDate() === currentDay.getDate()
    );
  });
  console.log(upcomingTodos, "upcomingTodos::::::::");

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Upcoming</Text>
        <Search />
      </View>

      <WeekPicker />

      <View className="flex-row justify-between items-center my-3">
        <Text className="text-base font-medium text-black">
          Today. {currentDayText}
        </Text>
        <Text className="text-base font-medium text-primary">Reschedule</Text>
      </View>

      <View className="border-b border-border w-full my-3"></View>

      {upComingTodoIsLoading ? (
        <Loader />
      ) : !upcomingTodos || upcomingTodos.length === 0 ? (
        <View className="justify-center items-center mt-20">
          <Text className="text-gray-500 font-medium text-base">
            No upcoming todos yet 👀
          </Text>
        </View>
      ) : (
        <UpcomingTodos upcomingTodos={upcomingTodos} />
      )}
    </Container>
  );
};

export default Calender;
