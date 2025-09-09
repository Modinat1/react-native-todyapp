import useAuthStore from "@/store/features/useAuthStore";
import axios from "axios";

const axiosInstance2 = axios.create({
  baseURL: "https://todybackend.onrender.com",
});

// Request interceptor
axiosInstance2.interceptors.request.use(
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
axiosInstance2.interceptors.response.use(
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

export default axiosInstance2;
