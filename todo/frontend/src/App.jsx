import { useState } from "react";
import "./App.css";

const API_BASE = "/api/todos";

function App() {
  const [userName, setUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("1");
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("Create or select a user first.");
  const [isUserSelected, setIsUserSelected] = useState(false);

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const loadTodos = async (userId) => {
    setStatus("Loading todos...");
    const data = await apiRequest(`/user/${userId}`);
    setTodos(data.data || []);
    setStatus(`Loaded ${data.data?.length || 0} todo(s)`);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (!userName.trim()) return;

    try {
      setStatus("Creating user...");
      const data = await apiRequest(`/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName.trim() }),
      });

      setCurrentUserId(String(data.data.id));
      setIsUserSelected(true);
      setUserName("");
      await loadTodos(String(data.data.id));
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleUseExistingUser = async () => {
    if (!currentUserId.trim()) {
      setStatus("Please enter user ID");
      return;
    }

    try {
      await loadTodos(currentUserId);
      setIsUserSelected(true);
      setStatus(`Using user ID ${currentUserId}`);
    } catch (error) {
      setIsUserSelected(false);
      setStatus(error.message);
    }
  };

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    if (!todoTitle.trim() || !currentUserId) return;

    try {
      setStatus("Creating todo...");
      await apiRequest(``, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: todoTitle.trim(),
          user_id: Number(currentUserId),
        }),
      });

      setTodoTitle("");
      await loadTodos(currentUserId);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleToggleCompleted = async (todo) => {
    try {
      await apiRequest(`/user/${currentUserId}/${todo.id}/completed`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      await loadTodos(currentUserId);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await apiRequest(`/user/${currentUserId}/${todoId}`, {
        method: "DELETE",
      });
      await loadTodos(currentUserId);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="app">
      <h1>Todo App</h1>

      <section className="card">
        <h2>Create user</h2>
        <form onSubmit={handleCreateUser} className="row">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
          />
          <button type="submit">Create user</button>
        </form>
      </section>

      <section className="card">
        <h2>Use existing user</h2>
        <div className="row">
          <input
            value={currentUserId}
            onChange={(e) => setCurrentUserId(e.target.value)}
            placeholder="User ID"
          />
          <button type="button" onClick={handleUseExistingUser}>
            Continue
          </button>
        </div>
      </section>

      {isUserSelected ? (
        <>
          <section className="card">
            <h2>Add todo (User ID: {currentUserId})</h2>
            <form onSubmit={handleCreateTodo} className="row">
              <input
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                placeholder="Todo title"
              />
              <button type="submit">Add todo</button>
            </form>
          </section>

          <section className="card">
            <h2>Todos</h2>
            {todos.length === 0 ? (
              <p>No todos found for this user.</p>
            ) : (
              <ul className="todo-list">
                {todos.map((todo) => (
                  <li key={todo.id} className="todo-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(todo.completed)}
                        onChange={() => handleToggleCompleted(todo)}
                      />
                      <span className={todo.completed ? "done" : ""}>
                        {todo.title}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <section className="card">
          <p className="hint">
            First create a user or continue with an existing user ID.
          </p>
        </section>
      )}

      <p className="status">{status}</p>
    </main>
  );
}

export default App;
