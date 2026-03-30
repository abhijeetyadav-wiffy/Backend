import express from "express";

const router = express.Router()

const checkIfBodyExits = (req,res,next) => {
    const body = req.body;
    if(!body) return res.status(400).json({msg : "error"})
    next();
}
router.get("/", checkIfBodyExits,(req, res) => {
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