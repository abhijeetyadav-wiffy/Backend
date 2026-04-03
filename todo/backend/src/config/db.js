import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "root",
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log("Connected to DB");
    client.release();
  })
  .catch(err => console.error("DB connection error", err));

export default pool;