const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // your MySQL password
  database: "pagination_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Route to get paginated data
app.get("/users", (req, res) => {
  const limit = 5; // records per page
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const countQuery = "SELECT COUNT(*) AS count FROM users";
  const dataQuery = "SELECT * FROM users LIMIT ? OFFSET ?";

  db.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).json({ error: err });
    const totalRecords = countResult[0].count;
    const totalPages = Math.ceil(totalRecords / limit);

    db.query(dataQuery, [limit, offset], (err, dataResult) => {
      if (err) return res.status(500).json({ error: err });
      res.json({
        currentPage: page,
        totalPages: totalPages,
        users: dataResult,
      });
    });
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
