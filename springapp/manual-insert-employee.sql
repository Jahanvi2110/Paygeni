-- Check current database state and manually insert new employee
-- Run this in MySQL Command Line or MySQL Workbench

-- Step 1: Check current employees
SELECT 'CURRENT EMPLOYEES IN DATABASE:' as status;
SELECT id, firstName, lastName, email, phoneNumber, department, position, salary, status 
FROM employees 
ORDER BY id;

-- Step 2: Check current user accounts
SELECT 'CURRENT USER ACCOUNTS:' as status;
SELECT id, email, role, employee_id 
FROM user_accounts 
ORDER BY id;

-- Step 3: Insert Alice Johnson (new employee from signup)
INSERT INTO employees (
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    designation, 
    department, 
    position, 
    hireDate, 
    salary, 
    status, 
    address, 
    emergencyContact, 
    emergencyPhone
) VALUES (
    'Alice',
    'Johnson', 
    'alice.johnson@company.com',
    '9876543210',
    'Employee',
    'Marketing',
    'Marketing Specialist',
    CURDATE(),
    65000.00,
    'ACTIVE',
    'Address to be updated',
    'Emergency contact to be updated',
    '0000000000'
);

-- Step 4: Get the employee ID and insert user account
SET @new_employee_id = LAST_INSERT_ID();

INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES (
    'alice.johnson@company.com',
    'password123',
    'employee',
    @new_employee_id
);

-- Step 5: Verify the insertion
SELECT 'NEW EMPLOYEE INSERTED:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.phoneNumber, e.department, e.position, e.salary, u.role
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
WHERE e.email = 'alice.johnson@company.com';

-- Step 6: Show all employees after insertion
SELECT 'ALL EMPLOYEES AFTER INSERTION:' as status;
SELECT id, firstName, lastName, email, phoneNumber, department, position, salary, status 
FROM employees 
ORDER BY id;
