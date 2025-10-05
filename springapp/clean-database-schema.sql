-- =====================================================
-- CLEAN & SIMPLIFIED DATABASE SCHEMA
-- Only Essential Columns for Payroll Management System
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Drop existing tables (if they exist)
DROP TABLE IF EXISTS deductions;
DROP TABLE IF EXISTS salary_components;
DROP TABLE IF EXISTS payrolls;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS user_accounts;
DROP TABLE IF EXISTS employees;

-- Step 3: Create simplified EMPLOYEES table
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    position VARCHAR(100),
    salary DECIMAL(10,2),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create simplified USER_ACCOUNTS table
CREATE TABLE user_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'EMPLOYEE',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Step 5: Create simplified PAYROLLS table
CREATE TABLE payrolls (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    pay_period VARCHAR(20) NOT NULL, -- e.g., "Jan 2024"
    basic_salary DECIMAL(10,2) NOT NULL,
    total_earnings DECIMAL(10,2) NOT NULL,
    total_deductions DECIMAL(10,2) NOT NULL,
    net_salary DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    pay_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Step 6: Create simplified DEDUCTIONS table
CREATE TABLE deductions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payroll_id BIGINT NOT NULL,
    deduction_type VARCHAR(50) NOT NULL, -- TAX, PF, INSURANCE, OTHER
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payroll_id) REFERENCES payrolls(id) ON DELETE CASCADE
);

-- Step 7: Create simplified ATTENDANCE table
CREATE TABLE attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    month VARCHAR(20) NOT NULL, -- e.g., "Jan 2024"
    present_days INT DEFAULT 0,
    absent_days INT DEFAULT 0,
    total_working_days INT DEFAULT 22,
    attendance_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Step 8: Insert sample employees
INSERT INTO employees (first_name, last_name, email, phone, department, position, salary, hire_date, status) VALUES
('John', 'Smith', 'john.smith@company.com', '1234567890', 'Engineering', 'Software Developer', 25000.00, '2023-01-15', 'ACTIVE'),
('Alice', 'Johnson', 'alice.johnson@company.com', '2345678901', 'HR', 'HR Manager', 30000.00, '2022-06-01', 'ACTIVE'),
('Mike', 'Davis', 'mike.davis@company.com', '3456789012', 'Engineering', 'Software Developer', 22000.00, '2023-03-20', 'ACTIVE'),
('Emma', 'Wilson', 'emma.wilson@company.com', '4567890123', 'Finance', 'Financial Analyst', 28000.00, '2023-05-10', 'ACTIVE'),
('David', 'Brown', 'david.brown@company.com', '5678901234', 'Admin', 'Admin Assistant', 20000.00, '2023-02-28', 'ACTIVE');

-- Step 9: Insert user accounts
INSERT INTO user_accounts (employee_id, username, password, role) VALUES
(1, 'john.smith', 'password123', 'EMPLOYEE'),
(2, 'alice.johnson', 'password123', 'ADMIN'),
(3, 'mike.davis', 'password123', 'EMPLOYEE'),
(4, 'emma.wilson', 'password123', 'EMPLOYEE'),
(5, 'david.brown', 'password123', 'EMPLOYEE');

-- Step 10: Insert sample payrolls
INSERT INTO payrolls (employee_id, pay_period, basic_salary, total_earnings, total_deductions, net_salary, status, pay_date) VALUES
(1, 'Jan 2024', 25000.00, 25000.00, 6000.00, 19000.00, 'PAID', '2024-01-31'),
(1, 'Feb 2024', 25000.00, 25000.00, 6000.00, 19000.00, 'PAID', '2024-02-29'),
(2, 'Jan 2024', 30000.00, 30000.00, 7200.00, 22800.00, 'PAID', '2024-01-31'),
(2, 'Feb 2024', 30000.00, 30000.00, 7200.00, 22800.00, 'PAID', '2024-02-29'),
(3, 'Jan 2024', 22000.00, 22000.00, 5280.00, 16720.00, 'PAID', '2024-01-31'),
(3, 'Feb 2024', 22000.00, 22000.00, 5280.00, 16720.00, 'PAID', '2024-02-29'),
(4, 'Jan 2024', 28000.00, 28000.00, 6720.00, 21280.00, 'PAID', '2024-01-31'),
(4, 'Feb 2024', 28000.00, 28000.00, 6720.00, 21280.00, 'PAID', '2024-02-29'),
(5, 'Jan 2024', 20000.00, 20000.00, 4800.00, 15200.00, 'PAID', '2024-01-31'),
(5, 'Feb 2024', 20000.00, 20000.00, 4800.00, 15200.00, 'PAID', '2024-02-29');

-- Step 11: Insert sample deductions
INSERT INTO deductions (payroll_id, deduction_type, amount, description) VALUES
-- John Smith deductions
(1, 'TAX', 2500.00, 'Income Tax'),
(1, 'PF', 3000.00, 'Provident Fund'),
(1, 'OTHER', 500.00, 'Other Deductions'),
(2, 'TAX', 2500.00, 'Income Tax'),
(2, 'PF', 3000.00, 'Provident Fund'),
(2, 'OTHER', 500.00, 'Other Deductions'),

-- Alice Johnson deductions
(3, 'TAX', 3000.00, 'Income Tax'),
(3, 'PF', 3600.00, 'Provident Fund'),
(3, 'OTHER', 600.00, 'Other Deductions'),
(4, 'TAX', 3000.00, 'Income Tax'),
(4, 'PF', 3600.00, 'Provident Fund'),
(4, 'OTHER', 600.00, 'Other Deductions'),

-- Mike Davis deductions
(5, 'TAX', 2200.00, 'Income Tax'),
(5, 'PF', 2640.00, 'Provident Fund'),
(5, 'OTHER', 440.00, 'Other Deductions'),
(6, 'TAX', 2200.00, 'Income Tax'),
(6, 'PF', 2640.00, 'Provident Fund'),
(6, 'OTHER', 440.00, 'Other Deductions'),

-- Emma Wilson deductions
(7, 'TAX', 2800.00, 'Income Tax'),
(7, 'PF', 3360.00, 'Provident Fund'),
(7, 'OTHER', 560.00, 'Other Deductions'),
(8, 'TAX', 2800.00, 'Income Tax'),
(8, 'PF', 3360.00, 'Provident Fund'),
(8, 'OTHER', 560.00, 'Other Deductions'),

-- David Brown deductions
(9, 'TAX', 2000.00, 'Income Tax'),
(9, 'PF', 2400.00, 'Provident Fund'),
(9, 'OTHER', 400.00, 'Other Deductions'),
(10, 'TAX', 2000.00, 'Income Tax'),
(10, 'PF', 2400.00, 'Provident Fund'),
(10, 'OTHER', 400.00, 'Other Deductions');

-- Step 12: Insert sample attendance
INSERT INTO attendance (employee_id, month, present_days, absent_days, total_working_days, attendance_percentage) VALUES
(1, 'Jan 2024', 20, 2, 22, 90.91),
(1, 'Feb 2024', 19, 3, 22, 86.36),
(2, 'Jan 2024', 22, 0, 22, 100.00),
(2, 'Feb 2024', 21, 1, 22, 95.45),
(3, 'Jan 2024', 18, 4, 22, 81.82),
(3, 'Feb 2024', 20, 2, 22, 90.91),
(4, 'Jan 2024', 21, 1, 22, 95.45),
(4, 'Feb 2024', 19, 3, 22, 86.36),
(5, 'Jan 2024', 17, 5, 22, 77.27),
(5, 'Feb 2024', 18, 4, 22, 81.82);

-- Step 13: Verification
SELECT 'DATABASE CLEANUP COMPLETE!' as status;
SELECT 'EMPLOYEES' as table_name, COUNT(*) as count FROM employees;
SELECT 'USER_ACCOUNTS' as table_name, COUNT(*) as count FROM user_accounts;
SELECT 'PAYROLLS' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'DEDUCTIONS' as table_name, COUNT(*) as count FROM deductions;
SELECT 'ATTENDANCE' as table_name, COUNT(*) as count FROM attendance;

-- Show sample data
SELECT 'SAMPLE EMPLOYEES' as info;
SELECT id, CONCAT(first_name, ' ', last_name) as name, email, department, salary FROM employees;

SELECT 'SAMPLE PAYROLLS' as info;
SELECT p.id, CONCAT(e.first_name, ' ', e.last_name) as employee_name, p.pay_period, p.net_salary, p.status 
FROM payrolls p 
JOIN employees e ON p.employee_id = e.id 
LIMIT 5;

SELECT 'SAMPLE DEDUCTIONS' as info;
SELECT d.id, CONCAT(e.first_name, ' ', e.last_name) as employee_name, d.deduction_type, d.amount, p.pay_period
FROM deductions d
JOIN payrolls p ON d.payroll_id = p.id
JOIN employees e ON p.employee_id = e.id
LIMIT 10;
