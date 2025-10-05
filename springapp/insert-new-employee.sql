-- Insert new employee data directly into MySQL database
-- This will store the new employee's email, name, and phone number in the database

-- First, let's check what's currently in the employees table
SELECT 'Current employees in database:' as status;
SELECT id, firstName, lastName, email, phoneNumber, department, position, salary FROM employees;

-- Insert new employee (replace with actual data from signup)
-- Example: Alice Johnson
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
    'Alice',           -- firstName
    'Johnson',         -- lastName  
    'alice.johnson@company.com',  -- email
    '9876543210',      -- phoneNumber
    'Employee',        -- designation
    'Marketing',       -- department (auto-assigned)
    'Marketing Specialist', -- position (auto-assigned)
    CURDATE(),         -- hireDate
    65000.00,          -- salary (auto-calculated)
    'ACTIVE',          -- status
    'Address to be updated', -- address
    'Emergency contact to be updated', -- emergencyContact
    '0000000000'       -- emergencyPhone
);

-- Insert corresponding user account
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES (
    'alice.johnson@company.com',  -- email
    'password123',                -- password
    'employee',                   -- role
    LAST_INSERT_ID()              -- employee_id (gets the ID from the previous INSERT)
);

-- Verify the data was inserted
SELECT 'New employee data inserted:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.phoneNumber, e.department, e.position, e.salary, u.role 
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
WHERE e.email = 'alice.johnson@company.com';

-- Show all employees
SELECT 'All employees in database:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.phoneNumber, e.department, e.position, e.salary 
FROM employees e 
ORDER BY e.id;
