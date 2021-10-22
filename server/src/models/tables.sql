CREATE DATABASE pslwallet;
USE pslwallet;

CREATE TABLE activity (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  concept VARCHAR(50) NOT NULL,
  type ENUM('Inflow', 'Outflow') NOT NULL,
  amount INT NOT NULL,
  category ENUM('Food', 'Transport', 'Services', 'Clothing', 'Other') NOT NULL,
  date TIMESTAMP NOT NULL
);
