import axiosInstance from "../axiosConfig";
import { TODO_ENDPOINTS } from "../endpoints";

export class TodoServices {
  static async getTodos() {
    const response = await axiosInstance.get(TODO_ENDPOINTS.GET_TODOS);
    return response;
  }

  static async getTodo(userId: string) {
    const response = await axiosInstance.get(TODO_ENDPOINTS.GET_TODO(userId));
    return response;
  }

  static async postTodo(credentials: any) {
    const response = await axiosInstance.post(
      TODO_ENDPOINTS.POST_TODO,
      credentials
    );
    return response;
  }

  static async updateTodo(todoId: string, credentials: any) {
    const response = await axiosInstance.patch(
      TODO_ENDPOINTS.UPDATE_TODO(todoId),
      credentials
    );
    return response;
  }

  static async deleteTodo(todoId: string) {
    const response = await axiosInstance.delete(
      TODO_ENDPOINTS.DELETE_TODO(todoId)
    );
    return response;
  }

  static async addComment(todoId: string, credentials: any) {
    const response = await axiosInstance.post(
      TODO_ENDPOINTS.POST_COMMENT(todoId),
      credentials
    );
    return response;
  }
}
