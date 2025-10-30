const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // your MySQL password
  database: "rest_api_db", // using your existing database
});

db.connect(err => {
  if (err) {
    console.error(" Database connection failed:", err);
  } else {
    console.log(" Connected to MySQL Database (rest_api_db)");
  }
});


// GET all posts
app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET one post by ID
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// CREATE a new post
app.post("/api/posts", (req, res) => {
  const { title, content, author } = req.body;
  const sql = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)";
  db.query(sql, [title, content, author], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, title, content, author });
  });
});

// UPDATE a post
app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const sql = "UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?";
  db.query(sql, [title, content, author, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, title, content, author });
  });
});

//DELETE a post
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Post deleted successfully" });
  });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
