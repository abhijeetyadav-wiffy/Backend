import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { genrateToken } from "../utlis/generateToken.js";

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // Validate input
  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });
  res.status(201).json({
    succcess: true,
    message: "User Created Successfully",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //Check if user email exits in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email and password" });
  }

  //verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email aqnd password" });
  }
  //Genrate JWt Tokens
  const token = genrateToken(user.id, user.email);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "User Logged out Succesfully",
  });
};

export { register, login, logout };
