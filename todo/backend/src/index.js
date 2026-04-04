import express from "express";
import pool from "./config/db.js";

//routes
import appRoutes from './routes/appRoutes.js'

const app = express();
const PORT = 8000;

//middlerware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/todos',appRoutes)

const db = pool;

app.listen(PORT, () => {
  console.log("Server is running on 8000");
});
