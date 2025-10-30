// app.js
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "root123", // your MySQL password
  database: "login_system",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Registration page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Handle registration
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.send("❌ Please fill all fields!");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        console.log(err);
        return res.send("❌ Registration failed (username or email may exist).");
      }
      res.send("✅ Registration successful! <a href='/'>Go to Login</a>");
    });
  } catch (err) {
    res.send("❌ Error hashing password.");
  }
});

// Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.send("❌ Please fill all fields!");

  const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(sql, [username, username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.send("❌ User not found. <a href='/register'>Register here</a>");
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.user = user;
      res.redirect("/dashboard");
    } else {
      res.send("❌ Incorrect password. <a href='/'>Try again</a>");
    }
  });
});

// Dashboard route (protected)
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
