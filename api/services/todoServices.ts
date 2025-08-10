import axios from "../axiosConfig";
import { TODO_ENDPOINTS } from "../endpoints";

export class TodoServices {
  static async getTodos() {
    const response = await axios.get(TODO_ENDPOINTS.GET_TODOS);
    return response;
  }

  static async postTodo(credentials: any) {
    const response = await axios.post(TODO_ENDPOINTS.POST_TODO, credentials);
    return response;
  }
}
