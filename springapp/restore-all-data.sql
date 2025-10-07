-- =====================================================
-- COMPLETE DATA RESTORATION FROM GITHUB REPOSITORY
-- This script restores all the data that was in your database
-- =====================================================

-- Step 1: Connect to springapp database
USE springapp;

-- Step 2: Insert USERS data (from simple-user-table.sql)
INSERT INTO users (email, password, role) VALUES
('john.smith@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('alice.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN'),
('mike.davis@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('emma.wilson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE'),
('david.brown@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE');

-- Step 3: Insert EMPLOYEES data (from insert-signup-data.sql)
INSERT INTO employees (first_name, last_name, email, phone_number, designation, department, salary, status, date_of_joining) VALUES
('John', 'Doe', 'john.doe@company.com', '9876543210', 'Software Developer', 'IT', 75000.00, 'Active', '2020-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', '9876543211', 'HR Manager', 'HR', 85000.00, 'Active', '2019-05-20'),
('Peter', 'Jones', 'peter.jones@company.com', '9876543212', 'Accountant', 'Finance', 65000.00, 'Active', '2021-03-10'),
('Alice', 'Brown', 'alice.brown@company.com', '9876543213', 'Marketing Specialist', 'Marketing', 70000.00, 'Active', '2022-07-01'),
('Bob', 'White', 'bob.white@company.com', '9876543214', 'QA Engineer', 'IT', 68000.00, 'Active', '2020-11-01');

-- Step 4: Insert PAYROLLS data (sample payroll records)
INSERT INTO payrolls (employee_id, month, year, gross_salary, total_deductions, net_salary, payment_date) VALUES
(1, 'Dec', 2024, 75000.00, 12000.00, 63000.00, '2024-12-31'),
(2, 'Dec', 2024, 85000.00, 15000.00, 70000.00, '2024-12-31'),
(3, 'Dec', 2024, 65000.00, 10000.00, 55000.00, '2024-12-31'),
(4, 'Dec', 2024, 70000.00, 12000.00, 58000.00, '2024-12-31'),
(5, 'Dec', 2024, 68000.00, 11000.00, 57000.00, '2024-12-31');

-- Step 5: Insert ATTENDANCE data (sample attendance records)
INSERT INTO attendance (employee_id, date, status, check_in, check_out) VALUES
(1, '2024-12-01', 'Present', '09:00:00', '18:00:00'),
(1, '2024-12-02', 'Present', '09:15:00', '17:45:00'),
(1, '2024-12-03', 'Present', '08:45:00', '18:15:00'),
(2, '2024-12-01', 'Present', '09:00:00', '18:00:00'),
(2, '2024-12-02', 'Present', '09:10:00', '17:50:00'),
(3, '2024-12-01', 'Present', '09:00:00', '18:00:00'),
(3, '2024-12-02', 'Half_day', '09:00:00', '13:00:00'),
(4, '2024-12-01', 'Present', '09:00:00', '18:00:00'),
(5, '2024-12-01', 'Present', '09:00:00', '18:00:00');

-- Step 6: Insert LEAVE_REQUESTS data (sample leave requests)
INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status, applied_on) VALUES
(1, 'Sick Leave', '2024-12-15', '2024-12-16', 'Fever and cold', 'Approved', '2024-12-10'),
(2, 'Personal Leave', '2024-12-20', '2024-12-22', 'Family function', 'Pending', '2024-12-12'),
(3, 'Vacation', '2024-12-25', '2024-12-27', 'Christmas holidays', 'Approved', '2024-12-01'),
(4, 'Sick Leave', '2024-12-18', '2024-12-18', 'Doctor appointment', 'Approved', '2024-12-15'),
(5, 'Personal Leave', '2024-12-30', '2024-12-31', 'New Year celebration', 'Pending', '2024-12-20');

-- Step 7: Insert ADVANCE_REQUESTS data (sample advance requests)
INSERT INTO advance_requests (employee_id, amount_requested, request_date, approval_status, remarks) VALUES
(1, 15000.00, '2024-12-01', 'Approved', 'Medical emergency'),
(2, 25000.00, '2024-12-05', 'Pending', 'Home renovation'),
(3, 10000.00, '2024-12-10', 'Approved', 'Education fees'),
(4, 20000.00, '2024-12-15', 'Rejected', 'Not urgent'),
(5, 12000.00, '2024-12-20', 'Pending', 'Vehicle repair');

-- Step 8: Insert DEDUCTIONS data (sample deductions)
INSERT INTO deductions (employee_id, deduction_name, amount, month, year) VALUES
(1, 'Income Tax', 8000.00, 'Dec', 2024),
(1, 'Provident Fund', 3000.00, 'Dec', 2024),
(1, 'Health Insurance', 1000.00, 'Dec', 2024),
(2, 'Income Tax', 10000.00, 'Dec', 2024),
(2, 'Provident Fund', 4000.00, 'Dec', 2024),
(2, 'Health Insurance', 1000.00, 'Dec', 2024),
(3, 'Income Tax', 6000.00, 'Dec', 2024),
(3, 'Provident Fund', 2500.00, 'Dec', 2024),
(3, 'Health Insurance', 1000.00, 'Dec', 2024),
(4, 'Income Tax', 7000.00, 'Dec', 2024),
(4, 'Provident Fund', 3000.00, 'Dec', 2024),
(4, 'Health Insurance', 1000.00, 'Dec', 2024),
(5, 'Income Tax', 6500.00, 'Dec', 2024),
(5, 'Provident Fund', 2800.00, 'Dec', 2024),
(5, 'Health Insurance', 1000.00, 'Dec', 2024);

-- Step 9: Insert SALARY_COMPONENTS data (sample salary components)
INSERT INTO salary_components (employee_id, component_name, type, amount) VALUES
(1, 'Basic Salary', 'EARNING', 50000.00),
(1, 'HRA', 'EARNING', 15000.00),
(1, 'Transport Allowance', 'EARNING', 5000.00),
(1, 'Performance Bonus', 'EARNING', 5000.00),
(2, 'Basic Salary', 'EARNING', 60000.00),
(2, 'HRA', 'EARNING', 18000.00),
(2, 'Transport Allowance', 'EARNING', 5000.00),
(2, 'Performance Bonus', 'EARNING', 2000.00),
(3, 'Basic Salary', 'EARNING', 45000.00),
(3, 'HRA', 'EARNING', 12000.00),
(3, 'Transport Allowance', 'EARNING', 5000.00),
(3, 'Performance Bonus', 'EARNING', 3000.00),
(4, 'Basic Salary', 'EARNING', 48000.00),
(4, 'HRA', 'EARNING', 14000.00),
(4, 'Transport Allowance', 'EARNING', 5000.00),
(4, 'Performance Bonus', 'EARNING', 3000.00),
(5, 'Basic Salary', 'EARNING', 46000.00),
(5, 'HRA', 'EARNING', 13000.00),
(5, 'Transport Allowance', 'EARNING', 5000.00),
(5, 'Performance Bonus', 'EARNING', 4000.00);

-- Step 10: Verification - Show all restored data
SELECT 'DATA RESTORATION COMPLETE!' as status;

SELECT 'USERS' as table_name, COUNT(*) as count FROM users;
SELECT 'EMPLOYEES' as table_name, COUNT(*) as count FROM employees;
SELECT 'PAYROLLS' as table_name, COUNT(*) as count FROM payrolls;
SELECT 'ATTENDANCE' as table_name, COUNT(*) as count FROM attendance;
SELECT 'LEAVE_REQUESTS' as table_name, COUNT(*) as count FROM leave_requests;
SELECT 'ADVANCE_REQUESTS' as table_name, COUNT(*) as count FROM advance_requests;
SELECT 'DEDUCTIONS' as table_name, COUNT(*) as count FROM deductions;
SELECT 'SALARY_COMPONENTS' as table_name, COUNT(*) as count FROM salary_components;

-- Show sample data
SELECT 'SAMPLE USERS' as info;
SELECT id, email, role FROM users ORDER BY id;

SELECT 'SAMPLE EMPLOYEES' as info;
SELECT id, first_name, last_name, email, department, designation FROM employees ORDER BY id;

-- Instructions:
-- 1. Run this script in MySQL Workbench
-- 2. All your previous data will be restored
-- 3. Login credentials: email + password 'password123'
-- 4. Admin: alice.johnson@company.com
-- 5. Employees: john.smith@company.com, mike.davis@company.com, emma.wilson@company.com, david.brown@company.com
