import prisma from "../config/prisma.js";

export const getAllTodos = async () => {
  return await prisma.todos.findMany({
    orderBy: { id: "asc" },
  });
};

export const createTodo = async (title, user_id) => {
  return await prisma.todos.create({
    data: {
      title,
      user_id: Number(user_id),
      completed: false,
    },
  });
};

export const getTodosByUserId = async (user_id) => {
  return await prisma.todos.findMany({
    where: { user_id: Number(user_id) },
    orderBy: { id: "asc" },
  });
};

export const updateTodoByUserId = async (id, user_id, title) => {
  return await prisma.todos.updateMany({
    where: {
      id: Number(id),
      user_id: Number(user_id),
    },
    data: {
      title,
    },
  });
};

export const deleteTodoByUserId = async (user_id, id) => {
  return await prisma.todos.deleteMany({
    where: {
      id: Number(id),
      user_id: Number(user_id),
    },
  });
};

export const updateTodoCompleted = async (id, user_id, completed) => {
  return await prisma.todos.updateMany({
    where: {
      id: Number(id),
      user_id: Number(user_id),
    },
    data: {
      completed,
    },
  });
};
