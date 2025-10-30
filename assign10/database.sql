CREATE DATABASE rest_api_db;
USE rest_api_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO posts (title, content, author)
VALUES
('Hello World', 'This is my first post!', 'Admin'),
('Node.js REST API', 'Learning to build APIs with Express.', 'Maria'),
('MySQL Integration', 'Connecting Node.js with MySQL database.', 'John');
