-- Remove test user created during API testing
-- This will clean up the test@example.com user

-- First, find the employee ID for the test user
SELECT id, firstName, lastName, email FROM employees WHERE email = 'test@example.com';

-- Remove from user_accounts table first (due to foreign key constraint)
DELETE FROM user_accounts WHERE email = 'test@example.com';

-- Remove from employees table
DELETE FROM employees WHERE email = 'test@example.com';

-- Verify the test user has been removed
SELECT 'Employees table after cleanup:' as info;
SELECT id, firstName, lastName, email FROM employees WHERE email = 'test@example.com';

SELECT 'User accounts table after cleanup:' as info;
SELECT id, email, role FROM user_accounts WHERE email = 'test@example.com';

-- Show remaining employees
SELECT 'Remaining employees:' as info;
SELECT id, firstName, lastName, email, department FROM employees ORDER BY id;
