CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(10,2) NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
    );
INSERT INTO products VALUES (1, "True Wireless Earbuds", "Electronics", 21.24, 50);
INSERT INTO products
VALUES
	(2, "The Institute: A Novel", "Books", 17.99, 5000),
    (3,"Killer Instict", "Books", 16.80, 2000),
    (4,"My Favorite Half-Night Stand", "books", 11.99, 20),
    (5,"Uno", "Games", 9.99, 300),
    (6,"Cards Against Humanity", "Games", 25.00, 600),
    (7,"That's What She Said", "Games", 24.99, 200),
    (8,"Someone You Loved", "Music", 1.29, 10000),
    (9,"Old Town Road", "Music", 1.29, 5000),
    (10,"Truth Hurts", "Music", 1.29, 2493),
    (11,"The Git Up", "Music", 1.29, 1992);
ALTER TABLE products AUTO_INCREMENT=1;
    SELECT * from products;
    
    UPDATE products SET stock_quantity = 50 WHERE item_id = 1;
    SELECT stock_quantity FROM products WHERE item_id = 1;