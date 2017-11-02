const { Client } = require("pg");

const db = new Client({
  user: "tab",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432
});

db.connect();
exports.db = db;
