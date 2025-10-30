CREATE DATABASE IF NOT EXISTS search_posts_db;

USE search_posts_db;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content, author) VALUES
('Learning Node.js', 'Node.js is a JavaScript runtime for building server-side apps.', 'Alice'),
('Intro to MySQL', 'MySQL is a popular open-source database management system.', 'Bob'),
('Web Development Basics', 'HTML, CSS, and JavaScript are the foundation of web development.', 'Charlie'),
('Express Framework', 'Express simplifies building APIs and web apps with Node.js.', 'Alice'),
('Database Security', 'Use prepared statements and validation to prevent SQL injection.', 'Bob');
