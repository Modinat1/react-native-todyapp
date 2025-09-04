import axiosInstance from "../axiosConfig";
import { COMMENT_ENDPOINTS } from "../endpoints";

export class CommentServices {
  static async getComments(todoId: string) {
    const response = await axiosInstance.get(
      COMMENT_ENDPOINTS.GET_COMMENTS(todoId)
    );
    return response;
  }

  static async postComment(credentials: any) {
    const response = await axiosInstance.post(
      COMMENT_ENDPOINTS.POST_COMMENT,
      credentials
    );
    return response;
  }

  static async getComment(commentId: string) {
    const response = await axiosInstance.get(
      COMMENT_ENDPOINTS.GET_COMMENT(commentId)
    );
    return response;
  }
  static async updateComment(commentId: string) {
    const response = await axiosInstance.patch(
      COMMENT_ENDPOINTS.UPDATE_COMMENT(commentId)
    );
    return response;
  }
  static async deleteComment(commentId: string) {
    const response = await axiosInstance.delete(
      COMMENT_ENDPOINTS.DELETE_COMMENT(commentId)
    );
    return response;
  }
}
