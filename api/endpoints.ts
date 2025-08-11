export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

export const TODO_ENDPOINTS = {
  GET_TODOS: "/todos",
  GET_TODOS_BY_USER: (userId: number) => `todos/user/${userId}`,
  POST_TODO: "/todos/add",
};
