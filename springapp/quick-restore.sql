USE springapp;

-- Insert USERS data
INSERT INTO users (email, password, role) VALUES
('john.smith@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('alice.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN'),
('mike.davis@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('emma.wilson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('david.brown@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE');

-- Insert EMPLOYEES data
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, salary, status, date_of_joining) VALUES
('John', 'Doe', 'john.doe@company.com', '9876543210', 'Software Developer', 'IT', 75000.00, 'Active', '2020-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', '9876543211', 'HR Manager', 'HR', 85000.00, 'Active', '2019-05-20'),
('Peter', 'Jones', 'peter.jones@company.com', '9876543212', 'Accountant', 'Finance', 65000.00, 'Active', '2021-03-10'),
('Alice', 'Brown', 'alice.brown@company.com', '9876543213', 'Marketing Specialist', 'Marketing', 70000.00, 'Active', '2022-07-01'),
('Bob', 'White', 'bob.white@company.com', '9876543214', 'QA Engineer', 'IT', 68000.00, 'Active', '2020-11-01');

SELECT 'DATA RESTORED SUCCESSFULLY!' as status;
SELECT COUNT(*) as users_count FROM users;
SELECT COUNT(*) as employees_count FROM employees;
