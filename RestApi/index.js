const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path}`,
    (err, data) => {
      next();
    },
  );
  next();
});

app.use((req, res, next) => {
  console.log("Hello From MIddleware 2", req.myUserName);
  next();
});

//Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  // res.setHeader("myName", "Abhijeet Yadav"); //custom headers
  // console.log(req.headers);
  return res.json(users);
});

app
  .route("/api/users/:id")
  // GET
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    return res.json(user);
  })

  // PATCH
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    console.log("PATCH BODY:", body);

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.json({ status: "User Not Found" });
    }

    users[index] = { ...users[index], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log("WRITE ERROR:", err);
        return res.json({ status: "error", message: "File not updated" });
      }

      return res.json({ status: "success", updatedUser: users[index] });
    });
  })

  // DELETE
  .delete((req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(404).json({ msg: "user Not Found" });

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.json({ status: "User Not Found" });
    }

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", deletedId: id });
    });
  });

// POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: " All Field are Required" });
  }
  console.log("Body", body);

  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
