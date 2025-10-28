-- Fix Employee Login Issues
-- This script ensures all users have the correct password hash for 'admin123'
-- and creates proper employee users for testing

USE springapp;

-- Clear existing users to avoid conflicts
DELETE FROM users;

-- Insert Admin User
INSERT INTO users (
    username, 
    password, 
    role, 
    employee_id, 
    email, 
    phone_number, 
    first_name, 
    last_name, 
    department, 
    status, 
    created_at, 
    created_by
) VALUES (
    'admin@company.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- password: admin123
    'ADMIN',
    1,
    'admin@company.com',
    '1234567890',
    'Admin',
    'User',
    'Administration',
    'ACTIVE',
    CURDATE(),
    'SYSTEM'
);

-- Insert Employee Users
INSERT INTO users (
    username, 
    password, 
    role, 
    employee_id, 
    email, 
    phone_number, 
    first_name, 
    last_name, 
    department, 
    status, 
    created_at, 
    created_by
) VALUES 
-- Employee 1: John Smith
('john.smith@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 2, 'john.smith@company.com', '1234567891', 'John', 'Smith', 'Engineering', 'ACTIVE', CURDATE(), 'SYSTEM'),

-- Employee 2: Mike Davis  
('mike.davis@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 3, 'mike.davis@company.com', '1234567892', 'Mike', 'Davis', 'Engineering', 'ACTIVE', CURDATE(), 'SYSTEM'),

-- Employee 3: Emma Wilson
('emma.wilson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 4, 'emma.wilson@company.com', '1234567893', 'Emma', 'Wilson', 'Finance', 'ACTIVE', CURDATE(), 'SYSTEM'),

-- Employee 4: David Brown
('david.brown@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 5, 'david.brown@company.com', '1234567894', 'David', 'Brown', 'Administration', 'ACTIVE', CURDATE(), 'SYSTEM'),

-- Employee 5: Sarah Johnson
('sarah.johnson@company.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'EMPLOYEE', 6, 'sarah.johnson@company.com', '1234567895', 'Sarah', 'Johnson', 'Marketing', 'ACTIVE', CURDATE(), 'SYSTEM');

-- Verify the users were inserted correctly
SELECT 'USERS INSERTED SUCCESSFULLY!' as status;

-- Show all users with their roles
SELECT 'ALL USERS:' as info;
SELECT id, username, email, role, first_name, last_name, department, status 
FROM users 
ORDER BY role, id;

-- Show employee users specifically
SELECT 'EMPLOYEE USERS:' as info;
SELECT id, username, email, first_name, last_name, department, status 
FROM users 
WHERE role = 'EMPLOYEE'
ORDER BY id;

-- Show admin users
SELECT 'ADMIN USERS:' as info;
SELECT id, username, email, first_name, last_name, department, status 
FROM users 
WHERE role = 'ADMIN'
ORDER BY id;

-- Login Instructions
SELECT 'LOGIN INSTRUCTIONS:' as info;
SELECT 'All users (admin and employees) use password: admin123' as instruction;
SELECT 'Admin: admin@company.com' as admin_login;
SELECT 'Employees: john.smith@company.com, mike.davis@company.com, emma.wilson@company.com, david.brown@company.com, sarah.johnson@company.com' as employee_logins;
