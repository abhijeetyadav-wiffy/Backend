import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "Password123!",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    password: "Password123!",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: "Password123!",
  },
];

const mockTodosByEmail = {
  "alice@example.com": [
    { title: "Buy groceries", completed: false },
    { title: "Finish backend assignment", completed: true },
    { title: "Go for a run", completed: false },
  ],
  "bob@example.com": [
    { title: "Read Prisma docs", completed: true },
    { title: "Call project teammate", completed: false },
  ],
  "charlie@example.com": [
    { title: "Prepare weekly report", completed: false },
    { title: "Clean workspace", completed: true },
  ],
};

async function main() {
  const upsertedUsers = [];

  for (const user of mockUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const savedUser = await prisma.users.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    upsertedUsers.push(savedUser);
  }

  const userIds = upsertedUsers.map((user) => user.id);

  await prisma.todos.deleteMany({
    where: { user_id: { in: userIds } },
  });

  const todoRows = upsertedUsers.flatMap((user) => {
    const userTodos = mockTodosByEmail[user.email] ?? [];

    return userTodos.map((todo) => ({
      title: todo.title,
      completed: todo.completed,
      user_id: user.id,
    }));
  });

  if (todoRows.length > 0) {
    await prisma.todos.createMany({
      data: todoRows,
    });
  }

  console.log(`Seeded ${upsertedUsers.length} users and ${todoRows.length} todos.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
