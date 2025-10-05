-- SQL Script to Insert Signup Data into Database
-- Run this script in MySQL to save signup data to the database

-- Example: Insert a new employee from signup
-- Replace the values with actual signup data

-- Insert into employees table
INSERT INTO employees (
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    designation, 
    department, 
    position, 
    salary, 
    status, 
    hireDate, 
    address, 
    emergencyContact, 
    emergencyPhone
) VALUES (
    'John',           -- firstName (from signup)
    'Doe',            -- lastName (from signup)
    'john.doe@company.com',  -- email (from signup)
    '9876543210',     -- phoneNumber (from signup)
    'Employee',       -- designation
    'Engineering',    -- department (auto-generated)
    'Software Developer', -- position (auto-generated)
    65000,            -- salary (auto-generated)
    'ACTIVE',         -- status
    '2024-09-30',     -- hireDate (current date)
    'Address to be updated', -- address
    'Emergency contact to be updated', -- emergencyContact
    '0000000000'      -- emergencyPhone
);

-- Get the employee ID for the user account
SET @employee_id = LAST_INSERT_ID();

-- Insert into user_accounts table
INSERT INTO user_accounts (
    email, 
    password, 
    role, 
    employee_id
) VALUES (
    'john.doe@company.com',  -- email (from signup)
    'password123',           -- password (from signup)
    'employee',              -- role
    @employee_id             -- employee_id (from above)
);

-- Verify the data was inserted
SELECT 
    e.id,
    e.firstName,
    e.lastName,
    e.email,
    e.phoneNumber,
    e.department,
    e.position,
    e.salary,
    ua.role,
    ua.password
FROM employees e
JOIN user_accounts ua ON e.id = ua.employee_id
WHERE e.email = 'john.doe@company.com';

-- Instructions for using this script:
-- 1. Replace the example values with actual signup data
-- 2. Run this script in MySQL Workbench or command line
-- 3. The data will be saved to the database
-- 4. The user can then login with their credentials

-- To insert multiple signup records, repeat the INSERT statements
-- with different values for each new employee.
