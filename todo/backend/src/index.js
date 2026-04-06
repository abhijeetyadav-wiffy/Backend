import express from "express";
import rateLimit from "express-rate-limit";

//routes
import appRoutes from "./routes/appRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();
const PORT = 8000;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/todos", apiLimiter, appRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log("Server is running on 8000");
});
