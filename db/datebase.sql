
show databases;

CREATE DATABASE IF NOT EXISTS redes2;
USE redes2;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary int(5) DEFAULT NULL,
    primary key (id)
)


SHOW TABLES;

describe employee;

INSERT INTO employee (name, salary) value 
("andres", 500 ),
("joe", 700),
("pacho", 400);

