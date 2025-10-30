const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// === MySQL Connection ===
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // your MySQL password
  database: "file_upload_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

// === Multer setup ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for image types only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only JPEG, PNG, and JPG files allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB max
  fileFilter: fileFilter,
});

// === Routes ===
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", upload.single("profilePic"), (req, res) => {
  const name = req.body.name;
  const profilePic = req.file ? req.file.filename : null;

  if (!profilePic) {
    return res.send("<h3 style='color:red;'>No file uploaded or invalid file type!</h3>");
  }

  const sql = "INSERT INTO users (name, profile_pic) VALUES (?, ?)";
  db.query(sql, [name, profilePic], (err) => {
    if (err) throw err;
    res.send(`
      <h2>✅ File Uploaded & Data Saved Successfully!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Uploaded File:</strong> <img src="/uploads/${profilePic}" width="150"></p>
      <a href="/">⬅️ Go Back</a>
    `);
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
