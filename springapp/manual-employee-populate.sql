-- ===================================================================
-- MANUAL EMPLOYEE TABLE POPULATION
-- ===================================================================
-- Run this directly in MySQL Workbench or Command Line
-- This will populate the employees table with sample data

-- Step 1: Connect to your database
USE springapp;

-- Step 2: Check if employees table exists
SHOW TABLES LIKE 'employees';

-- Step 3: Clear any existing data
DELETE FROM employees;

-- Step 4: Insert sample employees
INSERT INTO employees (
    first_name, 
    last_name, 
    email, 
    phone_number, 
    designation, 
    department, 
    position, 
    hire_date, 
    salary, 
    status, 
    address, 
    emergency_contact, 
    emergency_phone
) VALUES 
('John', 'Smith', 'john.smith@company.com', '1234567890', 'Senior Developer', 'Engineering', 'Software Developer', '2023-01-15', 25000.00, 'ACTIVE', '123 Main Street, Bangalore, Karnataka', 'Jane Smith', '9876543210'),
('Alice', 'Johnson', 'alice.johnson@company.com', '2345678901', 'Manager', 'HR', 'HR Manager', '2022-06-01', 30000.00, 'ACTIVE', '456 Oak Avenue, Mumbai, Maharashtra', 'Bob Johnson', '8765432109'),
('Mike', 'Davis', 'mike.davis@company.com', '3456789012', 'Developer', 'Engineering', 'Software Developer', '2023-03-20', 22000.00, 'ACTIVE', '789 Pine Road, Chennai, Tamil Nadu', 'Sarah Davis', '7654321098'),
('Emma', 'Wilson', 'emma.wilson@company.com', '4567890123', 'Analyst', 'Finance', 'Financial Analyst', '2023-05-10', 28000.00, 'ACTIVE', '321 Elm Street, Delhi, Delhi', 'Tom Wilson', '6543210987'),
('David', 'Brown', 'david.brown@company.com', '5678901234', 'Assistant', 'Admin', 'Admin Assistant', '2023-02-28', 20000.00, 'ACTIVE', '654 Maple Avenue, Kolkata, West Bengal', 'Lisa Brown', '5432109876');

-- Step 5: Verify the data was inserted
SELECT 'EMPLOYEES INSERTED SUCCESSFULLY' as Status;
SELECT COUNT(*) as total_employees FROM employees;

SELECT 'EMPLOYEE DETAILS:' as Status;
SELECT 
    id, 
    CONCAT(first_name, ' ', last_name) as full_name,
    email,
    department,
    position,
    salary,
    status
FROM employees 
ORDER BY salary DESC;

-- Step 6: Clear and insert users table too
DELETE FROM users;

INSERT INTO users (
    username,
    password,
    role,
    employee_id,
    employee_ref_id,
    email,
    phone_number,
    first_name,
    last_name,
    department,
    status,
    created_at,
    created_by
) VALUES 
('john.smith@company.com', '$2a$10$encryptedpassword1', 'EMPLOYEE', 1, 1, 'john.smith@company.com', '1234567890', 'John', 'Smith', 'Engineering', 'ACTIVE', '2023-01-15', 'SYSTEM'),
('alice.johnson@company.com', '$2a$10$encryptedpassword2', 'MANAGER', 2, 2, 'alice.johnson@company.com', '2345678901', 'Alice', 'Johnson', 'HR', 'ACTIVE', '2022-06-01', 'SYSTEM'),
('mike.davis@company.com', '$2a$10$encryptedpassword3', 'EMPLOYEE', 3, 3, 'mike.davis@company.com', '3456789012', 'Mike', 'Davis', 'Engineering', 'ACTIVE', '2023-03-20', 'SYSTEM'),
('emma.wilson@company.com', '$2a$10$encryptedpassword4', 'EMPLOYEE', 4, 4, 'emma.wilson@company.com', '4567890123', 'Emma', 'Wilson', 'Finance', 'ACTIVE', '2023-05-10', 'SYSTEM'),
('david.brown@company.com', '$2a$10$encryptedpassword5', 'EMPLOYEE', 5, 5, 'david.brown@company.com', '5678901234', 'David', 'Brown', 'Admin', 'ACTIVE', '2023-02-28', 'SYSTEM');

SELECT 'USERS INSERTED SUCCESSFULLY' as Status;
SELECT COUNT(*) as total_users FROM users;

SELECT 'USER DETAILS:' as Status;
SELECT 
    id,
    username,
    role,
    employee_id,
    email,
    department
FROM users 
ORDER BY role, username;

-- Step 7: Final verification
SELECT '=== FINAL VERIFICATION ===' as Status;
SELECT 
    'Total Employees:' as info,
    COUNT(*) as count,
    'Total Users:' as info2,
    (SELECT COUNT(*) FROM users) as user_count
FROM employees;

SELECT 'SUCCESS! Both employees and users tables are now populated.' as FinalStatus;
