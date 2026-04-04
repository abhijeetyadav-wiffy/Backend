import pool from "../config/db.js";

export const createUser = async (name) => {
  const result = await pool.query(
    "INSERT INTO users (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};
