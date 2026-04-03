import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "get all todos" });
});

router.post("/", (req, res) => {
  res.json({ msg: "create a todo" });
});

router.get("/id", (req, res) => {
  res.json({ msg: "get a todo" });
});

router.patch("/id", (req, res) => {
  res.json({ msg: "update a todo" });
});

router.delete("/id", (req, res) => {
  res.json({ msg: "delete a todo" });
});

export default router;
