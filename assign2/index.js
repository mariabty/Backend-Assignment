const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.static("public")); // serve HTML/CSS/JS files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "root123",         // your MySQL password
  database: "registration"
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// Handle user registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("❌ Please fill all fields");
  }

  // Prepared statement to prevent SQL injection
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("⚠️ Email already registered!");
      }
      console.error(err);
      return res.status(500).send("❌ Database error");
    }
    res.send("✅ Registration successful!");
  });
});

// Success page showing all users
app.get("/success", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;

    // Simple HTML page showing all users
    let html = `
      <h2>✅ Registration Successful!</h2>
      <a href="/">Back to Registration</a>
      <h3>Registered Users:</h3>
      <table border="1" cellpadding="8" style="border-collapse:collapse;">
        <tr><th>ID</th><th>Username</th><th>Email</th></tr>
    `;
    results.forEach((user) => {
      html += `<tr><td>${user.id}</td><td>${user.username}</td><td>${user.email}</td></tr>`;
    });
    html += `</table>`;
    res.send(html);
  });
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
