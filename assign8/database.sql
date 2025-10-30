CREATE DATABASE file_upload_db;

USE file_upload_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  profile_pic VARCHAR(255)
);
