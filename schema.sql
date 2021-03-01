CREATE DATABASE employee_tracker_db;

DROP DATABASE IF EXISTS employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id INT 
manager_id INT
)