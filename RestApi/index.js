const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs')
const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended : true}))

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${user.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((res, req) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("Body",body);
  users.push({...body, id: users.length + 1})
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({status: "pending"})
  })
}); 

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
