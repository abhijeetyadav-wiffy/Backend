import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AuthForms from "./components/AuthForms";
import SessionHeader from "./components/SessionHeader";
import TodoSection from "./components/TodoSection";
import { useSession } from "./hooks/useSession";
import { loginUser, logoutUser, registerUser } from "./services/authService";
import {
  createTodo,
  getUserTodos,
  removeTodo,
  updateTodoCompleted,
} from "./services/todoService";

function App() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("Register or login to continue.");
  const {
    authToken,
    currentUser,
    isAuthenticated,
    persistSession,
    clearSession,
  } = useSession();

  const loadTodos = useCallback(
    async (userId) => {
      setStatus("Loading todos...");
      const data = await getUserTodos(userId, authToken);
      setTodos(data.data || []);
      setStatus(`Loaded ${data.data?.length || 0} todo(s)`);
    },
    [authToken],
  );

  const setRegisterField = (field, value) => {
    setRegisterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setLoginField = (field, value) => {
    setLoginForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = registerForm.name.trim();
    const email = registerForm.email.trim();
    const password = registerForm.password;

    if (!name || !email || !password) {
      setStatus("Name, email and password are required");
      return;
    }

    try {
      setStatus("Registering user...");
      const data = await registerUser({ name, email, password });

      const user = data.data;
      const token = data.token;

      if (!user?.id || !token) {
        throw new Error("Register response missing user or token");
      }

      persistSession(token, user);
      setRegisterForm({ name: "", email: "", password: "" });
      await loadTodos(String(user.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = loginForm.email.trim();
    const password = loginForm.password;

    if (!email || !password) {
      setStatus("Email and password are required");
      return;
    }

    try {
      setStatus("Logging in...");
      const data = await loginUser({ email, password });

      const user = data.data?.user;
      const token = data.data?.token || data.token;

      if (!user?.id || !token) {
        throw new Error("Login response missing user or token");
      }

      persistSession(token, user);
      setLoginForm((prev) => ({ ...prev, password: "" }));
      await loadTodos(String(user.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (authToken) {
        await logoutUser(authToken);
      }
    } catch {
      // Even if API logout fails, clear local session to prevent stale UI.
    }

    clearSession();
    setTodos([]);
    setStatus("Logged out");
  };

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    if (!todoTitle.trim() || !currentUser?.id) {
      return;
    }

    try {
      setStatus("Creating todo...");
      await createTodo({
        title: todoTitle.trim(),
        userId: currentUser.id,
        token: authToken,
      });

      setTodoTitle("");
      await loadTodos(String(currentUser.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleToggleCompleted = async (todo) => {
    try {
      await updateTodoCompleted({
        userId: currentUser.id,
        todoId: todo.id,
        completed: !todo.completed,
        token: authToken,
      });
      await loadTodos(String(currentUser.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await removeTodo({
        userId: currentUser.id,
        todoId,
        token: authToken,
      });
      await loadTodos(String(currentUser.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setTodos([]);
      return;
    }

    loadTodos(String(currentUser.id)).catch((error) => {
      setStatus(error.message);
    });
  }, [currentUser?.id, isAuthenticated, loadTodos]);

  return (
    <main className="app">
      <h1>Todo App</h1>

      {!isAuthenticated ? (
        <AuthForms
          registerForm={registerForm}
          onRegisterChange={setRegisterField}
          onRegisterSubmit={handleRegister}
          loginForm={loginForm}
          onLoginChange={setLoginField}
          onLoginSubmit={handleLogin}
        />
      ) : (
        <>
          <SessionHeader currentUser={currentUser} onLogout={handleLogout} />
          <TodoSection
            todoTitle={todoTitle}
            onTodoTitleChange={setTodoTitle}
            onCreateTodo={handleCreateTodo}
            todos={todos}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTodo={handleDeleteTodo}
          />
        </>
      )}

      <p className="status">{status}</p>
    </main>
  );
}

export default App;
