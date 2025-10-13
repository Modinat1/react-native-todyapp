import { Flag2 } from "@/assets";
import { Todo } from "@/lib/types";
import { formatDate, formatTime, getThemeColor } from "@/lib/utils";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewTodoModal from "./ViewTodoModal";

const Card = ({ data }: { data: Todo[] }) => {
  const { openSheet, closeSheet } = useBottomSheetStore();

  // console.log("data from Card::::::", JSON.stringify(data, null, 2));

  const showViewTodoModal = (todo: Todo) => {
    openSheet({
      snapPoints: ["80%"],
      content: (
        <ViewTodoModal
          todo={todo}
          onClose={() => {
            closeSheet();
          }}
        />
      ),
    });
  };

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => showViewTodoModal(item)}
          style={styles.cardWrapper}
        >
          {/* Top Bar */}
          <View
            style={[
              styles.topBar,
              { backgroundColor: getThemeColor(item.theme) },
            ]}
          >
            <Flag2 />
            <Text style={styles.priorityText}>Priority task {index + 1}</Text>
            <Feather
              name="more-horizontal"
              size={18}
              color="#fff"
              style={{ marginLeft: "auto" }}
            />
          </View>

          {/* Body */}
          <View style={styles.cardBody}>
            <View style={styles.titleRow}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: `${getThemeColor(item.theme)}`,
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
                    backgroundColor: `${getThemeColor(item.theme)}`,
                  }}
                />
              </View>

              <Text style={styles.title}>{item?.todoTitle}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <View style={styles.iconText}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="red"
                />
                <Text style={styles.time}>{formatTime(item?.createdAt)}</Text>
              </View>

              <View style={styles.iconText}>
                <Feather name="message-circle" size={14} color="#888" />
                <Text style={styles.meta}>{item?.comments?.length}</Text>
              </View>

              <View style={styles.iconText}>
                <Feather name="repeat" size={14} color="#888" />
                <Text style={styles.meta}>0</Text>
              </View>

              <Text style={styles.date}>{formatDate(item?.createdAt)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  empty: {
    padding: 20,
    alignItems: "center",
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  priorityText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  cardBody: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  time: {
    color: "red",
    fontSize: 12,
    marginLeft: 4,
  },
  meta: {
    color: "#666",
    fontSize: 12,
    marginLeft: 4,
  },
  date: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#666",
  },
});
