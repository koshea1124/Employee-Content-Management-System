INSERT INTO departments (names)
VALUES
('Human Resources'),
('Finance and Accounting'),
('Marketing'),
('Sales'),
('Operations'),
('Customer Service'),
('Information Technology');

INSERT INTO roles (title, salary, department_id)
VALUES
('HR Manager', 120000, 1),
('Financial Analyst', 90000, 2),
('Marketing Manager', 130000, 3),
('Sales Reresentative', 80000,4),
('Operations Manager', 120000, 5),
('Customer Service Rep', 50000, 6),
('IT Manager', 140000, 7),
('Training and Development Specialist', 80000, 1),
('Accounts Payable Clerk', 45000, 2),
('Digital Marketing Specialist', 75000, 3),
('Sales Operations Analyst', 90000, 4),
('Supply Chain Coordinator', 70000, 5),
('Customer Success Manager', 100000, 6),
('Help Desk Support Specialist', 60000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kevin', 'OShea', 7, 1)
('Shawn', 'Frawley', 14, 2)
('Allison', 'Chacon', 3, 3)
('Scott', 'Felten', 6, 4)
('Katreena', 'Colato', 9, 5)
('Amber', 'Nelson', 1, 6)
('Joe', 'Chavez', 5, 7)
('Al', 'Carter', 4, 8)
('Will', 'McCrae', 11, 9)
('Mike', 'Coakley', 10, 10)
('Keley', 'West', 8, 11)
('Caitlin', 'McCrae', 12, 12)
('Jamie', 'Quaglino', 2, 13)
('Kerrie', 'Anne', 13, 14)




