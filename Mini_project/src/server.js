import express from "express";
import {config} from 'dotenv'
import { connectDB, disconnectDb } from "./config/db.js";

//All Routes

import movieRoutes from './routes/movieRoutes.js'

config();
connectDB();

const app = express();

app.use("/movie",movieRoutes)




const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on Port http://localhost:${PORT}`);
});


