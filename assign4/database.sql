CREATE DATABASE IF NOT EXISTS dynamic_content;

USE dynamic_content;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

INSERT INTO users (username) VALUES ('Alice'), ('Bob'), ('Charlie');

INSERT INTO posts (title, content, author_id) VALUES
('First Post', 'This is the first blog post content.', 1),
('Node.js Rocks!', 'Let’s learn backend development with Express.', 2),
('MySQL Integration', 'Connecting Node.js to MySQL made easy!', 3);
