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
  database: "search_posts_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// Fetch all posts (or search)
app.get("/posts", (req, res) => {
  const search = req.query.search || "";
  const sql = "SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?";
  const likeQuery = `%${search}%`;

  db.query(sql, [likeQuery, likeQuery], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
