import express from "express";
import {
  getTodos,
  createTodoHandler,
  getTodosByUserHandler,
  updateTodoByUserHandler,
  deleteTodoUserByIdHandler,
  createUserHandler,
  updateTodoCompletedHandler
} from "../controllers/todoController.js";

const router = express.Router();

//REST API
router.get("/", getTodos);
router.get("/user/:user_id", getTodosByUserHandler);
router.post("/user", createUserHandler);
router.post("/", createTodoHandler);
router.put("/user/:user_id/:id", updateTodoByUserHandler);
router.delete("/user/:user_id/:id", deleteTodoUserByIdHandler);
router.patch("/user/:user_id/:id/completed", updateTodoCompletedHandler);

export default router;
