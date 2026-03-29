const express = require("express");
const app = express();
const PORT = 4000

app.get("/hello", (req,res) =>{
  res.json({ msg: "Hello Backend"})
})




app.listen(PORT, () => {
  console.log(`Server is running on Port http://localhost:${PORT}`);
});
