import { Todo } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentServices } from "../services/commentServices";

type CommentsResponse = {
  todos: Todo[];
  todo: Todo;
};

export const usePostComment = () => {
  return useMutation({
    mutationFn: (payload: any) => CommentServices.postComment(payload),
  });
};

export const useGetComments = (todoId: string) =>
  useQuery<CommentsResponse>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await CommentServices.getComments(todoId);
      return res.data;
    },
  });

export const useGetComment = (commentId: string) =>
  useQuery<CommentsResponse>({
    queryKey: ["comment", commentId],
    queryFn: async () => {
      const res = await CommentServices.getComment(commentId);
      return res.data;
    },
  });
