CREATE DATABASE pslwallet;
USE pslwallet;

CREATE TABLE user (
  email VARCHAR(320) NOT NULL PRIMARY KEY,
  password VARCHAR(60) NOT NULL, -- Hashed with SALT
  name VARCHAR(20) NOT NULL
);

CREATE TABLE activity (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  concept VARCHAR(50) NOT NULL,
  type ENUM('Income', 'Outflow') NOT NULL,
  amount INT UNSIGNED NOT NULL,
  category ENUM('Food', 'Transport', 'Services', 'Clothing', 'Other') NOT NULL,
  date TIMESTAMP NOT NULL,
  createdBy VARCHAR(320) NOT NULL,
  FOREIGN KEY (createdBy) REFERENCES user(email) ON DELETE CASCADE
);
