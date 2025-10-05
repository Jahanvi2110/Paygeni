-- Insert sample employee
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, position, salary, hire_date, status, address, emergency_contact, emergency_phone) 
VALUES ('John', 'Doe', 'john@example.com', '1234567890', 'Software Engineer', 'IT', 'Developer', 60000, '2024-01-01', 'ACTIVE', '123 Main St', 'Jane Doe', '0987654321');

-- Get the employee ID
SET @employee_id = LAST_INSERT_ID();

-- Insert corresponding user account
INSERT INTO users (username, password, role, employee_id) 
VALUES ('john@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'employee', @employee_id);

-- Insert admin employee
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, position, salary, hire_date, status, address, emergency_contact, emergency_phone) 
VALUES ('Admin', 'User', 'admin@company.com', '1111111111', 'Administrator', 'Management', 'Admin', 80000, '2024-01-01', 'ACTIVE', '456 Admin Ave', 'Admin Contact', '2222222222');

-- Get the admin employee ID
SET @admin_employee_id = LAST_INSERT_ID();

-- Insert admin user account
INSERT INTO users (username, password, role, employee_id) 
VALUES ('admin@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'admin', @admin_employee_id);

-- Show inserted data
SELECT 'Employees:' as Table_Name;
SELECT * FROM employees;
SELECT 'Users:' as Table_Name;
SELECT * FROM users;
