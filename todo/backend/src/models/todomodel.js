import pool from "../config/db.js";

export const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return result.rows;
};

export const createTodo = async (title, user_id) => {
  const result = await pool.query(
    "INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *",
    [title, user_id],
  );
  return result.rows[0];
};

export const getTodosByUserId = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC",
    [user_id],
  );
  return result.rows;
};

export const updateTodoByUserId = async (id, user_id, title) => {
  const result = await pool.query(
    "UPDATE todos SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [title, id, user_id],
  );
  return result.rows[0];
};

export const deleteTodoByUserId = async (user_id, id) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE user_id = $1 AND id = $2 RETURNING *",
    [user_id, id],
  );
  return result.rows[0];
};
