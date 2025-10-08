import * as FileSystem from "expo-file-system";
import axiosInstance from "../axiosConfig";
import { COMMENT_ENDPOINTS } from "../endpoints";
import axiosInstance2 from "./multipartConfig";

type Attachment = {
  uri: string;
  name?: string;
  mimeType?: string;
  type?: "image" | "audio" | "doc" | string;
};

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
      formData
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

const BASE_URL = "https://todybackend.onrender.com";

async function getUploadableFile(uri: string) {
  const filename = uri.split("/").pop();
  if (!FileSystem.cacheDirectory) {
    throw new Error("Cache directory is not available.");
  }
  const newPath = FileSystem.cacheDirectory + filename;
  await FileSystem.copyAsync({ from: uri, to: newPath });
  return newPath;
}

export async function postCommentService(
  payload: {
    todoId: string;
    commenterText: string;
    attachments?: Attachment[];
  },
  token?: string
) {
  const { todoId, commenterText, attachments = [] } = payload;

  const formData = new FormData();
  formData.append("todoId", todoId);
  formData.append("commenterText", commenterText || "");

  for (let i = 0; i < attachments.length; i++) {
    const att = attachments[i];

    const uploadUri = await getUploadableFile(att.uri);
    const name = att.name ?? `file_${Date.now()}_${i}`;
    const mimeType =
      att.mimeType ?? (att.type === "audio" ? "audio/m4a" : "image/jpeg");

    formData.append("attachments", {
      uri: uploadUri,
      name,
      type: mimeType,
    } as any);
  }

  const res = await fetch(`${BASE_URL}/comment`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  // Throw readable error for React Query
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to post comment (${res.status})`);
  }

  return res.json(); // expected API response
}
