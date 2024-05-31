-- rol
--user
--access
--module_access
--category
--menu_itmes
--categoryDishFood
--dishOfTheDay
--admin
--spot
--order
--finalOrder

CREATE DATABASE Restaurant;

-- Role Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL
);

INSERT INTO role (type) VALUES 
('user'), 
('administrator'), 
('super_administrator');

-- User Table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id INTEGER DEFAULT 1 NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Module Table
CREATE TABLE module (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    disabled BOOLEAN DEFAULT false
);

INSERT INTO module (type) VALUES 
('categories'),
('menuItems'),
('dishOfTheDay'),
('configuration'),
('roles'),
('orders'),
('system');

-- Module Access Table
CREATE TABLE module_access (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    access_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
    CONSTRAINT fk_module FOREIGN KEY (access_id) REFERENCES module (id)
);

-- Category Table
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    user_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
);

-- Menu Items Table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    discount NUMERIC(5, 2),
    images TEXT[],
    available_quantity INTEGER NOT NULL,
    menu_of_the_day BOOLEAN DEFAULT false,
    user_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
);

-- Junction Table for Menu Items and Categories
CREATE TABLE menu_item_categories (
    menu_item_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    CONSTRAINT fk_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id),
    PRIMARY KEY (menu_item_id, category_id)
);

-- Location Table
CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    department VARCHAR(50) NOT NULL,
    cities TEXT[] NOT NULL
);

-- Admin Table
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    logo TEXT NOT NULL,
    location TEXT NOT NULL,
    user_id INTEGER,
    location_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
    CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES location (id)
);

-- Spot Table
CREATE TABLE spot (
    id SERIAL PRIMARY KEY,
    description TEXT,
    admin_id INTEGER,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admin (id)
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    total NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    is_payed BOOLEAN NOT NULL,
    total_quantity INTEGER NOT NULL,
    spot_id INTEGER NOT NULL,
    CONSTRAINT fk_spot FOREIGN KEY (spot_id) REFERENCES spot (id)
);

-- Menu Item Order Table
CREATE TABLE menu_item_order (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (id)
);
