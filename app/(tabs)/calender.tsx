import { useGetTodos } from "@/api/hooks/todo";
import { Search } from "@/assets";
import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import UpcomingTodos from "@/components/UpcomingTodos";
import WeekPicker from "@/components/WeekPicker";
import { useState } from "react";
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

  const currentDate = new Date();
  const currentDayIndex = new Date().getDay() - 1;
  const currentDayText = weekDays[currentDayIndex];

  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading } = useGetTodos();

  const TodoData = data?.pages.flatMap((page) => page.todos) || [];

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const todayStr = formatDate(new Date());

  const upcomingTodos = TodoData?.filter((todo) => {
    if (!todo.dueDate) return false;

    const dueDateStr = formatDate(new Date(todo.dueDate));

    const dueDateObj = new Date(dueDateStr);

    const selectedMonthMatches = dueDateObj.getMonth() === selectedMonth;
    const selectedYearMatches = dueDateObj.getFullYear() === selectedYear;

    const isTodayOrFuture = dueDateStr >= todayStr;

    return selectedMonthMatches && selectedYearMatches && isTodayOrFuture;
  });

  // console.log(upcomingTodos, "upcomingTodos::::::::");

  return (
    <Container>
      <View className="flex-row justify-between items-center my-5">
        <BackButton />
        <Text className="text-black text-xl font-bold"> Upcoming</Text>
        <Search />
      </View>

      <WeekPicker
        todoData={TodoData}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
      />

      <View className="flex-row justify-between items-center my-3">
        <Text className="text-base font-medium text-black">
          Today. {currentDayText}
        </Text>
        <Text className="text-base font-medium text-primary">Reschedule</Text>
      </View>

      <View className="border-b border-border w-full my-3"></View>

      {isLoading ? (
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
