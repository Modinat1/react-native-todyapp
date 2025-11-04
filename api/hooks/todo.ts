import { Todo } from "@/lib/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { TODO_ENDPOINTS } from "../endpoints";
import { TodoServices } from "../services/todoServices";

type TodosResponse = {
  todos: Todo[];
  todo: Todo;
  hasNextPage?: boolean;
  nextCursor?: boolean;
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (payload: any) => TodoServices.postTodo(payload),
  });
};

export const useGetTodos = () =>
  useInfiniteQuery<TodosResponse>({
    queryKey: ["todos"],

    initialPageParam: null,

    queryFn: async ({ pageParam = null }) => {
      const res = await TodoServices.getTodos(
        pageParam ? { cursor: pageParam } : {}
      );
      return res.data;
    },

    getNextPageParam: (lastPage) => {
      // lastPage is the last fetched response (TodosResponse)
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 5000,
    staleTime: 0,
  });

// export const useGetTodos = (cursor?: Record<string, any>) =>
//   useQuery<TodosResponse>({
//     queryKey: ["todos", cursor],
//     queryFn: async () => {
//       const res = await TodoServices.getTodos(cursor);
//       return res.data;
//     },
//     refetchOnWindowFocus: true, // refetch on focus
//     refetchOnReconnect: true, // refetch on reconnect
//     refetchInterval: 5000, // optional: poll every 5s
//     staleTime: 0,
//   });

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

export const useUpdateTodoStatus = (todoId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ status }: { status: string }) => {
      const res = await TodoServices.updateTodoStatus(todoId, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// export const getTodos = async ({
//   status,
//   page = 1,
//   limit = 4,
// }: {
//   status?: string;
//   page?: number;
//   limit?: number;
// }) => {
//   const params: Record<string, string | number> = { page, limit };
//   if (status) params.status = status;

//   const response = await axios.get("/api/todos", { params });
//   return response.data;
// };
