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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL
);

INSERT INTO role (id, type) VALUES 
(gen_random_uuid(), 'user'), 
(gen_random_uuid(), 'administrator'), 
(gen_random_uuid(), 'super_administrator');

-- User Table
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id UUID DEFAULT '00000000-0000-0000-0000-000000000000' NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Module Table
CREATE TABLE module (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    disabled BOOLEAN DEFAULT false
);

INSERT INTO module (id, type) VALUES 
(gen_random_uuid(), 'categories'),
(gen_random_uuid(), 'menuItems'),
(gen_random_uuid(), 'dishOfTheDay'),
(gen_random_uuid(), 'configuration'),
(gen_random_uuid(), 'roles'),
(gen_random_uuid(), 'orders'),
(gen_random_uuid(), 'system');

-- Module Access Table
CREATE TABLE module_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    access_id UUID,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
    CONSTRAINT fk_module FOREIGN KEY (access_id) REFERENCES module (id)
);

-- Category Table
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    user_id UUID,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
); -- LOCAL

-- Menu Items Table
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    discount NUMERIC(5, 2),
    images TEXT[],
    available_quantity INTEGER NOT NULL,
    menu_of_the_day BOOLEAN DEFAULT false,
    user_id UUID,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id)
); -- LOCAL

-- Junction Table for Menu Items and Categories
CREATE TABLE menu_item_categories (
    menu_item_id UUID NOT NULL,
    category_id UUID NOT NULL,
    CONSTRAINT fk_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id),
    PRIMARY KEY (menu_item_id, category_id)
); -- LOCAL

-- Location Table
CREATE TABLE location (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department VARCHAR(50) NOT NULL,
    cities TEXT[] NOT NULL
);

-- Admin Table
CREATE TABLE admin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    logo TEXT NOT NULL,
    location TEXT NOT NULL,
    user_id UUID,
    location_id UUID,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id),
    CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES location (id)
);

-- Spot Table
CREATE TABLE spot (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT,
    admin_id UUID,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admin (id)
); -- LOCAL

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    is_payed BOOLEAN NOT NULL,
    total_quantity INTEGER NOT NULL,
    spot_id UUID NOT NULL,
    CONSTRAINT fk_spot FOREIGN KEY (spot_id) REFERENCES spot (id)
); -- LOCAL

-- Menu Item Order Table
CREATE TABLE menu_item_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quantity INTEGER NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    order_id UUID NOT NULL,
    menu_item_id UUID NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (id)
); -- LOCAL



-- Local should be a new database with mongo DB
