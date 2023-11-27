-- +goose Up
-- SQL in section 'Up' is executed when the migration is applied

-- Create Customer table
CREATE TABLE customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT,
    number_phone TEXT
);

-- Create Product table
CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL
);

-- Create Order table
CREATE TABLE order_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    created_at TEXT
       FOREIGN KEY(customer_id) REFERENCES customer(id),
 
);

-- Create OrderItem table with a foreign key reference to the order_table
CREATE TABLE order_item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES order_table(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- +goose Down
-- SQL section 'Down' is executed when the migration is rolled back

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS order_table;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS customer;
