// import useAuthStore from "@/store/features/useAuthStore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// const API_URL = "https://todybackend.onrender.com";

// export const registerForPushNotifications = async (userId: string) => {
//   console.log(userId, "from notif");
//   const token = useAuthStore.getState().token;

//   try {
//     // Setup Android notification channel
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     // Check if running on physical device
//     if (!Device.isDevice) {
//       console.log("Push notifications only work on physical devices");
//       return;
//     }

//     // Check existing permissions
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     // Request permissions if not granted
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       console.log("Push notification permissions denied");
//       return;
//     }

//     // Get Expo push token
//     const tokenData = await Notifications.getExpoPushTokenAsync({
//       projectId: "4113ef05-ddea-42fa-96d3-6c660a200368",
//     });
//     const pushToken = tokenData.data;

//     console.log("Expo Push Token:", pushToken);

//     // Check if token has changed
//     const savedToken = await AsyncStorage.getItem("pushToken");

//     if (savedToken !== pushToken) {
//       // Send token to backend
//       const response = await axios.post(
//         `${API_URL}/user/push-token`,
//         {
//           userId,
//           pushToken: pushToken,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         // Save token locally
//         await AsyncStorage.setItem("pushToken", pushToken);
//         console.log("✅ Push token saved successfully");
//       }
//     } else {
//       console.log("Push token unchanged, no update needed");
//     }

//     return pushToken;
//   } catch (error) {
//     console.error("❌ Error registering for push notifications:", error);
//     if (axios.isAxiosError(error)) {
//       console.error("API Error:", error.response?.data);
//     }
//   }
// };

// // Optional: Function to remove push token on logout
// export const removePushToken = async (userId: string) => {
//   try {
//     await axios.delete(`${API_URL}/user/push-token/${userId}`);
//     await AsyncStorage.removeItem("pushToken");
//     console.log("✅ Push token removed");
//   } catch (error) {
//     console.error("❌ Error removing push token:", error);
//   }
// };

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotifications(userId: string) {
  if (!Device.isDevice) {
    console.log("Must use physical device for push notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  await Notifications.getExpoPushTokenAsync({
    projectId: "4113ef05-ddea-42fa-96d3-6c660a200368",
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}
