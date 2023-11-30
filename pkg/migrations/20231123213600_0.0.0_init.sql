-- +goose Up
-- SQL in section 'Up' is executed when the migration is applied

-- Create Customer table
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT,
    number_phone TEXT
);

-- Create Product table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL
);

-- Create Order table
CREATE TABLE order_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    created_at TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

-- Create OrderItem table with a foreign key reference to the order_table and product table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    product_name VARCHAR(255),
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES order_table(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- +goose Down
-- SQL section 'Down' is executed when the migration is rolled back

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS order_tables;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
