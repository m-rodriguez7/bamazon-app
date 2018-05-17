DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NULL,
  department_name VARCHAR(200) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 500, 5), ("sweater", "clothing", 10, 20), ("cast-iron skillet", "kitchen", 30, 10), 
("A Game of Thrones", "books", 10, 30), ("Shrek the Third SPECIAL EDITION", "movies", 25, 10), 
("Elder Scrolls V: Skyrim VR SPECIAL EDITION, NOW WITH FUNKY MODE", "video games", 60, 100), 
("7", "music", 20, 500), ("infinity gauntlet", "toys", 50, 50), ("16GB Flash Drive", "electronics", 10, 20), 
("Bluetooth Headphones", "electronics", 50, 200);
