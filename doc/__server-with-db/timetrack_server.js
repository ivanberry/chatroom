const http = require("http");
const work = require("./timetrack");
const { db } = require("./db");

db
  .query(
    `
    CREATE TABLE IF NOT EXISTS work (
		id int not null,
		hours decimal	default 0,
		date date,
		archive int default 0,
		description char(100),
		primary key (id)
    )
    `
  )
  .then(() => {
    server.listen(9003, () => {
      console.log("Server running on port 9003");
    });
  })
  .catch(err => console.log(err));

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
