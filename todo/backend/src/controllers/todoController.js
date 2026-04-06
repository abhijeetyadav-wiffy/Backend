import {
  getAllTodos,
  createTodo,
  getTodosByUserId,
  updateTodoByUserId,
  deleteTodoByUserId,
  updateTodoCompleted,
} from "../models/todomodel.js";
import { createUser } from "../models/usermodel.js";

export const createUserHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await createUser(name);
    res.status(201).json({
      success: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTodosByUserHandler = async (req, res) => {
  try {
    const { user_id } = req.params;
    const todos = await getTodosByUserId(user_id);
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createTodoHandler = async (req, res) => {
  try {
    const { title, user_id } = req.body;
    const newTodo = await createTodo(title, user_id);
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateTodoByUserHandler = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const { title } = req.body;

    const updatedTodo = await updateTodoByUserId(id, user_id, title);
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found for this user",
      });
    }
    res.status(200).json({
      success: true,
      message: `Todo updated`,
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateTodoCompletedHandler = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await updateTodoCompleted(id, user_id, completed);
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found for this user",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo completion updated",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// export const deleteTodos = async (req, res) => {
//   try {
//     const { id } = req.params;

//     res.status(200).json({
//       success: true,
//       message: `Deleted todo ${id}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

export const deleteTodoUserByIdHandler = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const deleteTodo = await deleteTodoByUserId(user_id, id);
    res.status(200).json({
      success: true,
      message: `Todo deleted`,
      data: deleteTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
