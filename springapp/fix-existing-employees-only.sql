-- Fix Login for Existing Employees Only
-- This script ONLY updates passwords for existing employees
-- It does NOT add any new employees

USE springapp;

-- Show current users before making changes
SELECT 'CURRENT USERS IN DATABASE:' as status;
SELECT id, username, email, role, first_name, last_name, department 
FROM users 
ORDER BY id;

-- Update ALL existing users to use the same password hash for 'admin123'
-- This ensures all existing employees can login with password: admin123
UPDATE users 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'
WHERE id > 0;

-- Verify the password updates
SELECT 'PASSWORD UPDATE COMPLETE!' as status;

-- Show updated users
SELECT 'UPDATED USERS:' as status;
SELECT id, username, email, role, first_name, last_name, department 
FROM users 
ORDER BY id;

-- Show employee users specifically
SELECT 'EMPLOYEE USERS (can login with admin123):' as info;
SELECT id, username, email, first_name, last_name, department 
FROM users 
WHERE role = 'EMPLOYEE'
ORDER BY id;

-- Show admin users
SELECT 'ADMIN USERS (can login with admin123):' as info;
SELECT id, username, email, first_name, last_name, department 
FROM users 
WHERE role = 'ADMIN'
ORDER BY id;

-- Login Instructions for ALL existing users
SELECT 'LOGIN INSTRUCTIONS FOR ALL EXISTING USERS:' as info;
SELECT 'All existing users (admin and employees) now use password: admin123' as instruction;
SELECT 'Use their existing email addresses with password: admin123' as note;
