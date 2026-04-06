import express from "express";
import {
  getTodos,
  createTodoHandler,
  getTodosByUserHandler,
  updateTodoByUserHandler,
  deleteTodoUserByIdHandler,
  createUserHandler,
  updateTodoCompletedHandler,
} from "../controllers/todoController.js";

import {
  validateCreateUser,
  validateNameUserId,
  validateUpdateTodo,
  validateDeleteTodo,
  validateCompletedTodo,
} from "../middleware/input/validateNewTodo.js";

const router = express.Router();

//REST API
router.get("/", getTodos);
router.get("/user/:user_id", getTodosByUserHandler);
router.post("/user", validateCreateUser, createUserHandler);
router.post("/", validateNameUserId, createTodoHandler);
router.put("/user/:user_id/:id", validateUpdateTodo, updateTodoByUserHandler);
router.delete(
  "/user/:user_id/:id",
  validateDeleteTodo,
  deleteTodoUserByIdHandler,
);
router.patch(
  "/user/:user_id/:id/completed",
  validateCompletedTodo,
  updateTodoCompletedHandler,
);

export default router;