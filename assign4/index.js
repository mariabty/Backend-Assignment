// app.js
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // ✅ your MySQL password
  database: "dynamic_content",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint to fetch posts
app.get("/posts", (req, res) => {
  const sql = `
    SELECT posts.id, posts.title, posts.content, posts.created_at, users.username AS author
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC;
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
