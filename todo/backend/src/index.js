import express from "express";
import pool from "./config/db.js";

//routes
import appRoutes from './routes/appRoutes.js'

const app = express();
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import { logger } from './middleware/common.js';
import { customRouting } from './middleware/routing.js';
app.use(logger);
app.use(customRouting);


app.use('/api/todos',appRoutes)

const db = pool;

app.listen(PORT, () => {
  console.log("Server is running on 8000");
});
