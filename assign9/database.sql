CREATE DATABASE pagination_db;
USE pagination_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Insert sample data
INSERT INTO users (name, email)
VALUES
('Alice', 'alice@mail.com'),
('Bob', 'bob@mail.com'),
('Charlie', 'charlie@mail.com'),
('David', 'david@mail.com'),
('Eva', 'eva@mail.com'),
('Frank', 'frank@mail.com'),
('Grace', 'grace@mail.com'),
('Hannah', 'hannah@mail.com'),
('Ivy', 'ivy@mail.com'),
('Jake', 'jake@mail.com'),
('Kate', 'kate@mail.com'),
('Leo', 'leo@mail.com');
