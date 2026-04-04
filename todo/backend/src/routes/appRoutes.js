import express from "express";
import {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todoController.js";

const router = express.Router();

//REST API
router.get("/", getTodos);
router.post("/", createTodos);
router.put("/:id", updateTodos);
router.delete("/:id", deleteTodos);

export default router;
