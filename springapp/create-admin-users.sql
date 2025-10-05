-- Create admin users in the database
-- This script will add admin and manager users to distinguish from employees

USE springapp;

-- Check current users
SELECT 'CURRENT USERS IN DATABASE:' as status;
SELECT id, email, role, employee_id FROM user_accounts ORDER BY id;

-- Insert Admin User
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
    'Admin',
    'User',
    'admin@company.com',
    '9876543226',
    'Administrator',
    'Administration',
    'System Administrator',
    '2024-01-01',
    100000.00,
    'ACTIVE',
    'Admin Office',
    'Emergency Admin Contact',
    '9876543226'
);

-- Insert Manager User
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
    'Manager',
    'User',
    'manager@company.com',
    '9876543228',
    'Manager',
    'Management',
    'Department Manager',
    '2024-01-01',
    80000.00,
    'ACTIVE',
    'Manager Office',
    'Emergency Manager Contact',
    '9876543228'
);

-- Insert Admin User Account
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES (
    'admin@company.com',
    'admin123',
    'admin',
    (SELECT id FROM employees WHERE email = 'admin@company.com')
);

-- Insert Manager User Account
INSERT INTO user_accounts (
    email,
    password,
    role,
    employee_id
) VALUES (
    'manager@company.com',
    'manager123',
    'manager',
    (SELECT id FROM employees WHERE email = 'manager@company.com')
);

-- Verify the admin users were inserted
SELECT 'ADMIN USERS INSERTED:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.phoneNumber, e.department, e.position, e.salary, u.role
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
WHERE e.email IN ('admin@company.com', 'manager@company.com');

-- Show all users with their roles
SELECT 'ALL USERS WITH ROLES:' as status;
SELECT e.id, e.firstName, e.lastName, e.email, e.department, e.position, u.role
FROM employees e 
LEFT JOIN user_accounts u ON e.id = u.employee_id 
ORDER BY u.role, e.id;
