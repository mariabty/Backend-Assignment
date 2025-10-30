const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",      
  database: "nodedb"
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// API route to get all users
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
