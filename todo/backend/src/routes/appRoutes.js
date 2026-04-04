import express from "express";
import {
  getTodos,
  createTodoHandler,
  getTodosByUserHandler,
  updateTodoByUserHandler,
  deleteTodoUserByIdHandler
} from "../controllers/todoController.js";

const router = express.Router();

//REST API
router.get("/", getTodos);
router.get("/user/:user_id", getTodosByUserHandler);
router.post("/", createTodoHandler);
router.put("/user/:user_id/:id", updateTodoByUserHandler);
router.delete("/user/:user_id/:id", deleteTodoUserByIdHandler);

export default router;
