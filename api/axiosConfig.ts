import useAuthStore from "@/store/features/useAuthStore";
import axios from "axios";
// import { EXPO_BASEURL } from "@env";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = useAuthStore.getState().token;
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
  (response) => response,
  async (error) => {
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      try {
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
