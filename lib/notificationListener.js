import ViewTodoModal from "@/components/ViewTodoModal";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export const registerNotificationListeners = () => {
  Notifications.addNotificationResponseReceivedListener((response) => {
    // console.log("Notification tapped:", response);
    const data = response.notification.request.content.data;
    const todoId = data?.todoId;

    if (todoId) {
      setTimeout(() => {
        router.push("/(tabs)/todos");
        setTimeout(() => {
          const { openSheet, closeSheet } = useBottomSheetStore.getState();
          openSheet({
            snapPoints: ["80%"],
            content: (
              <ViewTodoModal
                todoId={todoId}
                onClose={() => {
                  closeSheet();
                }}
              />
            ),
          });
        }, 300);
      }, 100);
    }
  });
};
