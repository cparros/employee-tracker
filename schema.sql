DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT,
PRIMARY KEY (id)
)

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
)

CREATE TABLE department (
  id INT,
  name VARCHAR(30),
  PRIMARY KEY(id)
)