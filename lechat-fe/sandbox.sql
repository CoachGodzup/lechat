CREATE TABLE STUDENT
(
  StudentID int PRIMARY_KEY,
  Name varchar(255),
  Surname varchar(255),
  Class varchar(5),
  Media tinyint
);

INSERT INTO Student VALUES (0, 'Brambilla', 'Fumagalli', 'II A', 8)
INSERT INTO Student VALUES (1, 'Mario', 'Maria', 'III A', 6)
INSERT INTO Student VALUES (2, 'Gina', 'Degli Ardizzi', 'IV B', 7)


SELECT Surname FROM STUDENTS WHERE media > 7