import { months } from "@/lib/data";
import { Text, TouchableOpacity, View } from "react-native";

interface DropDownProps {
  todoData: { dueDate: string }[];
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
}

const DropDown = ({
  todoData,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  showDropdown,
  setShowDropdown,
}: DropDownProps) => {
  if (!showDropdown) return null;

  // Get unique years from todos
  const todoYears = Array.from(
    new Set(
      todoData
        .filter((todo) => todo.dueDate)
        .map((todo) => new Date(todo.dueDate).getFullYear())
    )
  ).sort((a, b) => a - b);

  // Get months for selected year
  const monthsForYear = months.filter((_, index) =>
    todoData.some(
      (todo) =>
        todo.dueDate &&
        new Date(todo.dueDate).getFullYear() === selectedYear &&
        new Date(todo.dueDate).getMonth() === index
    )
  );

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setShowDropdown(false);
  };

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setShowDropdown(false);
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 5,
        padding: 10,
        zIndex: 99,
      }}
    >
      {todoYears.map((year) => (
        <View
          key={year}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => handleSelectYear(year)}
            style={{ padding: 5 }}
          >
            <Text
              style={{
                color: year === selectedYear ? "#18A999" : "#333",
                fontWeight: year === selectedYear ? "600" : "400",
              }}
            >
              {year}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {monthsForYear.map((month, index) => (
              <TouchableOpacity
                key={month}
                onPress={() => handleSelectMonth(months.indexOf(month))}
                style={{ paddingHorizontal: 5, paddingVertical: 3 }}
              >
                <Text
                  style={{
                    color:
                      months.indexOf(month) === selectedMonth
                        ? "#18A999"
                        : "#333",
                    fontWeight:
                      months.indexOf(month) === selectedMonth ? "600" : "400",
                  }}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default DropDown;
