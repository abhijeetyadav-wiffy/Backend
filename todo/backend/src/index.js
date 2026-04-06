import express from "express";
import rateLimit from "express-rate-limit";
import { logger } from "./middleware/common.js";
import { customRouting } from "./middleware/routing.js";

//routes
import appRoutes from "./routes/appRoutes.js";

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

app.use(logger);
app.use(customRouting);

app.use("/api/todos", apiLimiter, appRoutes);

app.listen(PORT, () => {
  console.log("Server is running on 8000");
});
