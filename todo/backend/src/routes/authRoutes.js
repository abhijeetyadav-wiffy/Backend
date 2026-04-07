import express from "express";
import { login, logout, register } from "../controllers/authcontrollers.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/input/validateAuth.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

//testing
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", authMiddleware, logout);

export default router;
