CREATE DATABASE iec_db_v1;
USE iec_db_v1 ;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role ENUM('faculty', 'admin') NULL DEFAULT 'faculty',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id));
