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

import { register, login, logout } from "../controllers/authcontrollers.js";

import { validateNameUserId } from "../middleware/input/validateNewTodo.js";

const router = express.Router();

//REST API
router.get("/", getTodos);
router.get("/user/:user_id", getTodosByUserHandler);
router.post("/user", createUserHandler);
router.post("/", validateNameUserId,createTodoHandler);
router.put("/user/:user_id/:id", updateTodoByUserHandler);
router.delete("/user/:user_id/:id", deleteTodoUserByIdHandler);
router.patch("/user/:user_id/:id/completed", updateTodoCompletedHandler);


//Auth
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout)


export default router;
