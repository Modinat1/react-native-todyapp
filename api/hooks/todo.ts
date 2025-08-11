import { Todo } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TodoServices } from "../services/todoServices";

type TodosResponse = {
  todos: Todo[];
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (payload: any) => TodoServices.postTodo(payload),
  });
};

export const useGetTodos = () =>
  useQuery<TodosResponse>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await TodoServices.getTodos();
      return res.data;
    },
  });
