const http = require("http");
const work = require("./timetrack");
const { db } = require("./db");

db.query(
  "CREATE TABLE IF NOT EXISTS work (" +
    "id INT(10) NOT NULL AUTO_INCREMENT, " +
    "hours DECIMAL(5,2) DEFAULT 0, " +
    "date DATE, " +
    "archived INT(1) DEFAULT 0, " +
    "description LONGTEXT," +
    "PRIMARY KEY(id))",
  err => {
    server.listen(9003, () => console.log("Server running on localhost:9003"));
  }
);

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    switch (req.url) {
      case "/":
        work.add(db, req, res);
        break;
      case "/archive":
        work.archive(db, req, res);
        break;
      case "/delete":
        work.delete(db, req, res);
        break;
    }
  } else if (req.method === "GET") {
    switch (req.url) {
      case "/":
        work.showAdd(db, res);
        break;
      case "/archived":
        work.showArchive(db, res);
        break;
    }
  }
});
