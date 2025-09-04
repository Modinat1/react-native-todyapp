import { Todo } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TODO_ENDPOINTS } from "../endpoints";
import { TodoServices } from "../services/todoServices";

type TodosResponse = {
  todos: Todo[];
  todo: Todo;
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
    refetchOnWindowFocus: true, // refetch on focus
    refetchOnReconnect: true, // refetch on reconnect
    refetchInterval: 5000, // optional: poll every 5s
    staleTime: 0,
  });

export const useGetTodo = (todoId: string) =>
  useQuery<TodosResponse>({
    queryKey: ["todo", todoId],
    queryFn: async () => {
      const res = await TodoServices.getTodo(todoId);
      return res.data;
    },
    refetchOnWindowFocus: true, // refetch on focus
    refetchOnReconnect: true, // refetch on reconnect
    refetchInterval: 5000, // optional: poll every 5s
    staleTime: 0,
  });

export const useUpdateTodo = (todoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Todo>) => {
      console.log("PATCHing:", TODO_ENDPOINTS.UPDATE_TODO(todoId), data);
      const res = await TodoServices.updateTodo(todoId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
    onError: (err) => {
      console.error("update error", err);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => {
      const res = await TodoServices.deleteTodo(todoId);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => {
      console.error("error deleting todo", err);
    },
  });
};

export const useAddComment = (todoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    // this should post { commenterText } to the backend
    mutationFn: (payload: { commenterText: string }) =>
      TodoServices.addComment(todoId, payload),

    onSuccess: (res) => {
      // The updated todo returned from backend
      const updatedTodo: Todo = res.data.updatedTodo;

      // 1️⃣ update single todo cache
      queryClient.setQueryData<Todo>(["todo", todoId], updatedTodo);

      // 2️⃣ update the todos list cache
      queryClient.setQueryData<{ todos: Todo[] }>(["todos"], (old) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((t) =>
            t._id === updatedTodo._id ? updatedTodo : t
          ),
        };
      });
    },
  });
};
