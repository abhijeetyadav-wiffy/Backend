import { useState } from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../constants/storageKeys";

const parseStoredUser = () => {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const useSession = () => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) || "",
  );
  const [currentUser, setCurrentUser] = useState(parseStoredUser);

  const persistSession = (token, user) => {
    setAuthToken(token);
    setCurrentUser(user);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  };

  const clearSession = () => {
    setAuthToken("");
    setCurrentUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return {
    authToken,
    currentUser,
    isAuthenticated: Boolean(authToken && currentUser?.id),
    persistSession,
    clearSession,
  };
};
