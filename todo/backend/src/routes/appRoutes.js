import express from "express";
import {
  getTodos,
  createTodoHandler,
  getTodosByUserIdHandler,
  updateTodoByUserHandler,
  deleteTodoUserByIdHandler,
  updateTodoCompletedHandler,
} from "../controllers/todoController.js";

import {
  validateNameUserId,
  validateUpdateTodo,
  validateDeleteTodo,
  validateCompletedTodo,
  requireSelfUser,
} from "../middleware/input/validateNewTodo.js";

import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(authMiddleware);

//REST API
// router.get("/", getTodos);
router.get("/user/:user_id", requireSelfUser, getTodosByUserIdHandler);
router.post("/", validateNameUserId, createTodoHandler);
router.put(
  "/user/:user_id/:id",
  requireSelfUser,
  validateUpdateTodo,
  updateTodoByUserHandler,
);
router.delete(
  "/user/:user_id/:id",
  requireSelfUser,
  validateDeleteTodo,
  deleteTodoUserByIdHandler,
);
router.patch(
  "/user/:user_id/:id/completed",
  requireSelfUser,
  validateCompletedTodo,
  updateTodoCompletedHandler,
);

export default router;
