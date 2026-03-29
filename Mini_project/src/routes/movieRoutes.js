import express from "express";

const router = express.Router()

router.get("/", (req, res) =>{
    res.json({ msg: "Hello from GET"})
})

router.post("/", (req, res) =>{
    res.json({ msg: "Hello from POST"})
})

router.put("/", (req, res) =>{
    res.json({ msg: "Hello from PUT"})
})

router.delete("/", (req, res) =>{
    res.json({ msg: "Hello from DELTE"})
})

export default router;