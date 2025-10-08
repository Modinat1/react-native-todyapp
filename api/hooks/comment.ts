import { CommentsResponse } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CommentServices,
  postCommentService,
} from "../services/commentServices";

import useAuthStore from "@/store/features/useAuthStore";

export const usePostComment = (todoId: string) => {
  const queryClient = useQueryClient();
  // read the token directly (sync) from your zustand store
  const token = useAuthStore.getState().token;

  return useMutation({
    mutationFn: (payload: {
      todoId: string;
      commenterText: string;
      attachments?: any[];
    }) => postCommentService(payload, token),
    onSuccess: () => {
      // invalidate relevant queries so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["comments", todoId] });
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // optional
    },
  });
};

// export const usePostComment = (todoId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: any) => CommentServices.postComment(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["comments", todoId] });
//       queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
//     },
//     onError: (err) => {
//       console.error("Error posting comment:", err);
//     },
//   });
// };

export const useGetComments = (todoId: string) =>
  useQuery<CommentsResponse>({
    queryKey: ["comments", todoId],
    queryFn: async () => {
      const res = await CommentServices.getComments(todoId);
      return res.data;
    },
    enabled: !!todoId,
  });

export const useGetComment = (commentId: string) =>
  useQuery<CommentsResponse>({
    queryKey: ["comment", commentId],
    queryFn: async () => {
      const res = await CommentServices.getComment(commentId);
      return res.data;
    },
  });
