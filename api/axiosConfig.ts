import useAuthStore from "@/store/features/useAuthStore";
import axios from "axios";
// import { EXPO_BASEURL } from "@env";
// import EXPO_BA


const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
    // baseURL: EXPO_BASEURL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add auth token if exists
    try {
      const token = useAuthStore.getState().token;

      // console.log(token, 'from the axiosConfig')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error reading token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle success and error of response
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      try {
        // Clear auth state and token
        // useAuthStore.getState().logout();
        // await AsyncStorage.removeItem("token");

        // Navigate to login screen
        // router.replace("/(auth)/sign-in");

        console.log("401 Unauthorized: Redirected to login");
      } catch (storageError) {
        console.error("Error handling 401 unauthorized:", storageError);
      }
    }

    // Handle errors globally
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
