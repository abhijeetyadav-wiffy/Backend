const http = require("http");
// const fs = require("fs");
// const url = require("url");
// const { parse } = require("path");

const express = require("express");
const port = 8000;

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
  return res.send("Hello From About Page");
});

// function myhandler(req, res) {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.url} New Req Received\n`;
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("HomePage");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`Hello, ${username}`);
//         break;
//       case "search":
//         const search = myUrl.query.search_query;
//         res.end("Here are your results for " + search);
//       default:
//         res.end("404 Not found");
//     }
//   });
// }

// const myserver = http.createServer(app);
// myserver.listen(8000, () => console.log("Server Started"));

app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
