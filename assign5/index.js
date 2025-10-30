// app.js
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // ✅ your MySQL password
  database: "user_update_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// Get all users (for frontend display)
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update user data (using prepared statement)
app.post("/update", (req, res) => {
  const { id, username, email } = req.body;
  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  db.query(sql, [username, email, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("❌ Error updating user");
    } else {
      console.log(`✅ User ${id} updated`);
      res.send("✅ User updated successfully!");
    }
  });
});

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
