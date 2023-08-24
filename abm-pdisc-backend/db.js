import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "rocco",
  password: "123",
  database: "abm_pdisc",
});

db.connect(function (err) {
  if (err) throw err;
});

export default db;
