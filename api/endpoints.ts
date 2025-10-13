export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

export const TODO_ENDPOINTS = {
  GET_TODOS: "/todo",
  POST_TODO: "/todo",
  GET_TODO: (todoId: string) => `/todo/${todoId}`,
  POST_COMMENT: (todoId: string) => `/todo/${todoId}/comment`,
  UPDATE_TODO: (todoId: string) => `/todo/${todoId}`,
  DELETE_TODO: (todoId: string) => `/todo/${todoId}`,
  UPDATE_TODO_STATUS: (todoId: string) => `/todo/${todoId}/status`,
};

export const COMMENT_ENDPOINTS = {
  GET_COMMENTS: (todoId: string) => `/comment/${todoId}`,
  POST_COMMENT: "/comment",
  GET_COMMENT: (commentId: string) => `/comment/${commentId}/comment`,
  UPDATE_COMMENT: (commentId: string) => `/comment/${commentId}`,
  DELETE_COMMENT: (commentId: string) => `/comment/${commentId}`,
};
