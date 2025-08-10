import { useMutation, useQuery } from "@tanstack/react-query";
import { TodoServices } from "../services/todoServices";

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (payload: any) => TodoServices.postTodo(payload),
  });
};

export const useGetTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => TodoServices.getTodos(),
  });
