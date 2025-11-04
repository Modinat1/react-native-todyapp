import axiosInstance from "../axiosConfig";
import { USER_ENDPOINTS } from "../endpoints";

export class UserServices {
  static async getUser() {
    const response = await axiosInstance.get(USER_ENDPOINTS.GET_USER);
    return response;
  }
}
