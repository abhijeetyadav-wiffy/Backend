import express from "express";
import {config} from 'dotenv'

//All Routes
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'


config();
const app = express();

//Body parsing Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//All Routes
app.use("/movie",movieRoutes)
app.use("/auth",authRoutes)




const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on Port http://localhost:${PORT}`);
});


