-- Clean up unused columns from users and employees tables
-- This script removes columns that are not used in the frontend models

USE springapp;

-- Clean up USERS table - keep only essential columns
-- Remove unused columns from users table
ALTER TABLE users 
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS created_by,
DROP COLUMN IF EXISTS department,
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS first_name,
DROP COLUMN IF EXISTS last_login_date,
DROP COLUMN IF EXISTS last_name,
DROP COLUMN IF EXISTS notes,
DROP COLUMN IF EXISTS phone_number,
DROP COLUMN IF EXISTS status,
DROP COLUMN IF EXISTS employee_ref_id;

-- Clean up EMPLOYEES table - remove unused columns
-- Remove the 'name' column (we use first_name and last_name instead)
ALTER TABLE employees 
DROP COLUMN IF EXISTS name;

-- Show the cleaned up table structures
SELECT 'USERS table structure after cleanup:' as info;
DESCRIBE users;

SELECT 'EMPLOYEES table structure after cleanup:' as info;
DESCRIBE employees;

-- Show current data count
SELECT 'Current data counts:' as info;
SELECT 'Users count:' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Employees count:' as table_name, COUNT(*) as count FROM employees;
