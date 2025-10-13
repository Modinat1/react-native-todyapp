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
  const rawToken = useAuthStore.getState().token;
  const token: string | undefined = rawToken === null ? undefined : rawToken;

  return useMutation({
    mutationFn: (payload: {
      todoId: string;
      commenterText: string;
      attachments?: any[];
      token: string | undefined;
    }) => postCommentService(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", todoId] });
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
