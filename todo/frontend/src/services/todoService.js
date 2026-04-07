import { apiRequest } from "./apiClient";

const TODO_API_BASE = "/api/todos";

export const getUserTodos = (userId, token) => {
  return apiRequest({
    basePath: TODO_API_BASE,
    path: `/user/${userId}`,
    auth: true,
    token,
  });
};

export const createTodo = ({ title, userId, token }) => {
  return apiRequest({
    basePath: TODO_API_BASE,
    path: "",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    auth: true,
    token,
    body: JSON.stringify({
      title,
      user_id: Number(userId),
    }),
  });
};

export const updateTodoCompleted = ({ userId, todoId, completed, token }) => {
  return apiRequest({
    basePath: TODO_API_BASE,
    path: `/user/${userId}/${todoId}/completed`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    auth: true,
    token,
    body: JSON.stringify({ completed }),
  });
};

export const removeTodo = ({ userId, todoId, token }) => {
  return apiRequest({
    basePath: TODO_API_BASE,
    path: `/user/${userId}/${todoId}`,
    method: "DELETE",
    auth: true,
    token,
  });
};
