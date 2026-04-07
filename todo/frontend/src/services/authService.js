import { apiRequest } from "./apiClient";

const AUTH_API_BASE = "/api/auth";

export const registerUser = ({ name, email, password }) => {
  return apiRequest({
    basePath: AUTH_API_BASE,
    path: "/register",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = ({ email, password }) => {
  return apiRequest({
    basePath: AUTH_API_BASE,
    path: "/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = (token) => {
  return apiRequest({
    basePath: AUTH_API_BASE,
    path: "/logout",
    method: "POST",
    auth: true,
    token,
  });
};
