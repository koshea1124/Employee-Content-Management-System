DROP DATABASE IF EXISTS employeeCMS_db;
CREATE DATABASE employeeCMS_db;
USE employeeCMS_db;

-- Create Data Tables
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

