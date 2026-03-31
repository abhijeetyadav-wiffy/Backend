import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { email, name, password } = req.body;

  //Check id user exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({ error: "User Already Exits" });
  }

  //hash Paasword
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      name: name,
      email: email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return (
      res.status(400),
      json({ error: "User already exits with this email" })
    );
  }
};

export { register,login };
