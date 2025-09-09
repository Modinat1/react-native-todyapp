import axiosInstance from "../axiosConfig";
import { COMMENT_ENDPOINTS } from "../endpoints";
import axiosInstance2 from "./multipartConfig";

export class CommentServices {
  static async getComments(todoId: string) {
    const response = await axiosInstance.get(
      COMMENT_ENDPOINTS.GET_COMMENTS(todoId)
    );
    return response;
  }

  // static async postComment(formData: FormData) {
  //   const response = await axiosInstance2.post(
  //     COMMENT_ENDPOINTS.POST_COMMENT,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("response from servies::::::", response);

  //   return response;
  // }

  static async postComment(formData: FormData) {
    const response = await axiosInstance2.post(
      COMMENT_ENDPOINTS.POST_COMMENT,
      formData,
      {
        timeout: 120000,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`📊 Upload Progress: ${percentCompleted}%`);
          }
        },
      }
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
