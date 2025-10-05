-- Clean up unused columns from users and employees tables
-- This script removes columns that are not used in the frontend models

USE springapp;

-- Clean up USERS table - keep only essential columns
-- Remove unused columns from users table (one by one to avoid syntax errors)
ALTER TABLE users DROP COLUMN created_at;
ALTER TABLE users DROP COLUMN created_by;
ALTER TABLE users DROP COLUMN department;
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users DROP COLUMN first_name;
ALTER TABLE users DROP COLUMN last_login_date;
ALTER TABLE users DROP COLUMN last_name;
ALTER TABLE users DROP COLUMN notes;
ALTER TABLE users DROP COLUMN phone_number;
ALTER TABLE users DROP COLUMN status;
ALTER TABLE users DROP COLUMN employee_ref_id;

-- Clean up EMPLOYEES table - remove unused columns
-- Remove the 'name' column (we use first_name and last_name instead)
ALTER TABLE employees DROP COLUMN name;

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
