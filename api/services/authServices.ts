import axios from "../axiosConfig";
import { AUTH_ENDPOINTS } from "../endpoints";

export class AuthService {
  static async signIn(credentials: any) {
    const response = await axios.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response;
  }
}
